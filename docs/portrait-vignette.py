"""Grade the hero portrait and bake a vignetted-bust dissolve into it.

usage: python docs/portrait-vignette.py <source.jpg> <out.jpg|out.webp> [--mobile] [--dark] [--debug]
The result is flattened onto the site's light paper colour (#F4F4F4), so it needs no CSS mask.

--dark: for the dark theme. The white studio backdrop cannot be recoloured, so the subject is
cut out instead and saved as a transparent WebP that sits on any dark page colour. This uses
alpha matting followed by foreground estimation (needs the `pymatting` package), so fine hair
keeps its detail and no white halo survives. The same dissolve, grain and presets apply.
Run with: uv run --with pymatting --with pillow --with numpy --with scipy python docs/portrait-vignette.py ...

Default: the desktop file, public/img/kaden-hero.jpg (1067x1130).
--mobile: public/img/kaden-hero-mobile.jpg, a shorter bust for the phone hero, where the h1's
first line overlaps the bottom of the portrait. The dissolve starts higher and finishes sooner,
so the head, collar, bow tie and shoulder line stay crisp while the chest is already nearly
paper under the headline (ink on it must keep >= 7:1 contrast). Same curve, grain and dither;
the frame is trimmed just below the dissolve.
"""
import sys, numpy as np
from PIL import Image
from scipy import ndimage as ndi

src, out = sys.argv[1], sys.argv[2]
PAPER = 244.0
# Per-preset geometry (source rows/columns). bottom: chest dissolve start/end rows;
# left/right: rows over which the side reach grows, and how far it reaches.
PRESETS = {
    "desktop": dict(out_h=1130, bottom=(610, 1110), left=(400, 900, 400), right=(520, 1000, 430)),
    "mobile":  dict(out_h=950,  bottom=(540, 940),  left=(400, 860, 380), right=(520, 900, 400)),
}
P = PRESETS["mobile" if "--mobile" in sys.argv else "desktop"]
OUT_H = P["out_h"]                             # rows kept from the top of the frame

def smoother(t):                               # smootherstep: zero slope AND curvature at both ends
    t = np.clip(t, 0, 1); return t * t * t * (t * (t * 6 - 15) + 10)

a = np.asarray(Image.open(src).convert("L"), dtype=np.float32)[:1330, :]
H, W = a.shape

# 1. tone curve: lift the studio backdrop to about paper, keep blacks
adj = np.interp(a, np.array([0, .5, .87, 1]) * 255, np.array([0, .52, .957, 1]) * 255)

# 2. backdrop -> exactly paper (bright, smooth region connected to the frame edges)
bright = ndi.gaussian_filter(a, 3) > 200
lab, _ = ndi.label(bright)
border = np.zeros_like(bright); border[0, :] = True; border[:900, 0] = True; border[:900, -1] = True
keep = np.unique(lab[border & bright]); keep = keep[keep != 0]
bg = ndi.binary_erosion(np.isin(lab, keep), iterations=2, border_value=1)
bgs = ndi.gaussian_filter(bg.astype(np.float32), 2.5)
img = adj * (1 - bgs) + PAPER * bgs

# 2b. retouch: the white couch shows through the gap between arm and torso; fill it with the
#     jacket tone so it does not read as a light sliver inside the dissolve
box = np.zeros_like(bg); box[930:1065, 775:890] = True
gap = ndi.binary_dilation(box & (adj > 55), iterations=3)
gaps = ndi.gaussian_filter(gap.astype(np.float32), 2.0)
img = img * (1 - gaps) + 15.0 * gaps

# 3. vignette: three long eased falloffs whose reach grows down the frame, so the
#    kept area is a soft bust shape rather than a rectangle
y = np.arange(H, dtype=np.float32)[:, None]; x = np.arange(W, dtype=np.float32)[None, :]
(b0, b1), (l0, l1, lr), (r0, r1, rr) = P["bottom"], P["left"], P["right"]
bottom = 1 - smoother((y - b0) / (b1 - b0))                 # chest dissolve (desktop: ~485 px)
wl = 1 + lr * smoother((y - l0) / (l1 - l0))                # left reach: 0 at head height
wr = 1 + rr * smoother((y - r0) / (r1 - r0))                # right reach: starts below the shoulder
left = smoother(x / wl)
right = smoother((W - 1 - x) / wr)
alpha = bottom * left * right
alpha = ndi.gaussian_filter(alpha, 14)                      # melt any remaining creases
alpha = np.clip((alpha - 0.004) / 0.996, 0, 1)              # guarantee true zero at the frame

# 4. composite on paper, with fine grain through the dissolve and TPDF dither against banding
rng = np.random.default_rng(7)
grain = ndi.gaussian_filter(rng.standard_normal((H, W)).astype(np.float32), 0.6)
alpha_g = np.clip(alpha + grain * 0.075 * (4 * alpha * (1 - alpha)), 0, 1)
res = img * alpha_g + PAPER * (1 - alpha_g)
res += (rng.random((H, W)) - rng.random((H, W))) * 0.5 * (alpha > 0) * (alpha < 1)
res = np.where(alpha <= 0, PAPER, res)[:OUT_H]
if "--dark" in sys.argv:
    # Alpha matting, then foreground estimation: the two-step method compositors use for hair.
    # 1) a trimap says which pixels are certainly subject, certainly backdrop, or unknown;
    # 2) closed-form matting solves the opacity of the unknown pixels (PyMatting);
    # 3) the true subject colour of edge pixels is estimated with the backdrop's white taken
    #    out, which is what removes the halo.
    from pymatting import estimate_alpha_cf, estimate_foreground_ml
    backdrop = np.isin(lab, keep); subject = ~backdrop
    adj64 = adj.astype(np.float64)
    depth = ndi.distance_transform_edt(subject)              # how far inside the outline
    outside = ndi.distance_transform_edt(backdrop)
    soft = ndi.gaussian_filter(adj64, 0.8)
    sub = subject.astype(np.float64)                         # tone of the surrounding subject only
    around = ndi.gaussian_filter(adj64 * sub, 14) / np.maximum(ndi.gaussian_filter(sub, 14), 1e-3)

    # certainly backdrop: clear of the outline with no dark strand nearby (so long flyaway hairs
    # stay unknown and get solved), plus clean bright backdrop enclosed by loops of hair
    sure_bg = backdrop & (outside > 12) & (ndi.minimum_filter(soft, size=7) > 205)
    sure_bg |= backdrop & (outside > 3) & (ndi.minimum_filter(soft, size=3) > 212)
    # certainly subject: dark pixels, or anything deep inside except small bright islands
    bright_in = subject & (soft > 205)
    blab, nb = ndi.label(bright_in)
    island = np.isin(blab, 1 + np.flatnonzero(ndi.sum(bright_in, blab, index=np.arange(1, nb + 1)) < 4000))
    sure_fg = (subject & (soft < 55) & (depth >= 2)) | ((depth >= 34) & ~ndi.binary_dilation(island, iterations=3))
    sure_fg = ndi.binary_opening(sure_fg, iterations=1)
    # gaps in the hair: small bright islands set in dark hair are backdrop showing through
    glab, ng = ndi.label(subject & (soft > 205) & (depth < 130))
    idx = np.arange(1, ng + 1)
    ok = ((ndi.sum(np.ones_like(adj64), glab, index=idx) >= 3) & (ndi.sum(np.ones_like(adj64), glab, index=idx) < 2500)
          & (ndi.mean(around, glab, index=idx) < 150) & (ndi.mean(np.indices(adj.shape)[0], glab, index=idx) < 600))
    holes = np.isin(glab, 1 + np.flatnonzero(ok)) & (soft > 214)
    sure_bg |= holes
    sure_fg &= ~ndi.binary_dilation(holes, iterations=3)
    trimap = np.full(adj.shape, 0.5); trimap[sure_bg] = 0.0; trimap[sure_fg] = 1.0

    rgb = np.repeat((adj64 / 255.0)[:, :, None], 3, axis=2)
    matte = estimate_alpha_cf(rgb, trimap)
    # See-through hair: where sparse strands cross the backdrop inside a loop of hair, nothing
    # tells the solver the light between them is backdrop. There the answer is known in closed
    # form, because the backdrop tone B and the hair tone F are both known:
    # alpha = (B - C) / (B - F).
    B = float(np.median(adj64[sure_bg]))
    key = np.clip((B - adj64) / np.maximum(B - ndi.minimum_filter(soft, size=21), 1.0), 0, 1)
    mesh = ((trimap == 0.5) & subject & (depth < 34) & (around < 115)).astype(np.float64)
    light = np.clip((soft - 60) / 60, 0, 1)                  # leave the darkest hair pixels to the solver
    w = np.clip(ndi.gaussian_filter(mesh, 1.5) * 1.6, 0, 1) * light * light * (3 - 2 * light)
    matte = matte * (1 - w) + np.minimum(matte, key) * w
    colour = estimate_foreground_ml(rgb, matte)[:, :, 0] * 255.0
    unmixed = np.clip((adj64 - (1 - matte) * B) / np.maximum(matte, 0.04), 0, 255)
    colour = np.minimum(colour, colour * (1 - w) + np.minimum(colour, unmixed) * w)
    colour = colour * (1 - gaps) + 15.0 * gaps
    a8 = np.clip(np.rint(matte * alpha_g * 255), 0, 255).astype(np.uint8)[:OUT_H]
    g8 = np.clip(np.rint(colour), 0, 255).astype(np.uint8)[:OUT_H]
    Image.merge("RGBA", [Image.fromarray(g8)] * 3 + [Image.fromarray(a8)]).save(out, quality=84, method=6, exact=True)
    print("dark cutout saved", out, (W, OUT_H)); sys.exit()
Image.fromarray(np.clip(np.rint(res), 0, 255).astype(np.uint8)).save(out, quality=95, subsampling=0)
if "--debug" in sys.argv:
    Image.fromarray((alpha[:OUT_H] * 255).astype(np.uint8)).save(out.replace(".jpg", "-alpha.png"))
edge = np.concatenate([res[:, 0], res[:, -1], res[-1, :]])
print("frame edge min/max:", edge.min().round(1), edge.max().round(1), "size", res.shape[::-1])
