"""Grade the hero portrait and bake a vignetted-bust dissolve into it.

usage: python vignette.py <source.jpg> <out.jpg> [--debug]
The result is flattened onto the site's paper colour (#F4F4F4), so it needs no CSS mask.
"""
import sys, numpy as np
from PIL import Image
from scipy import ndimage as ndi

src, out = sys.argv[1], sys.argv[2]
PAPER = 244.0
OUT_H = 1130                                   # rows kept from the top of the frame

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
bottom = 1 - smoother((y - 610) / (1110 - 610))            # chest dissolves over ~485 px
wl = 1 + 400 * smoother((y - 400) / (900 - 400))            # left reach: 0 at head height
wr = 1 + 430 * smoother((y - 520) / (1000 - 520))           # right reach: starts below the shoulder
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
Image.fromarray(np.clip(np.rint(res), 0, 255).astype(np.uint8)).save(out, quality=95, subsampling=0)
if "--debug" in sys.argv:
    Image.fromarray((alpha[:OUT_H] * 255).astype(np.uint8)).save(out.replace(".jpg", "-alpha.png"))
edge = np.concatenate([res[:, 0], res[:, -1], res[-1, :]])
print("frame edge min/max:", edge.min().round(1), edge.max().round(1), "size", res.shape[::-1])
