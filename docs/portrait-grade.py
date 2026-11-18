import sys, numpy as np
from PIL import Image
from scipy import ndimage as ndi
src, out = sys.argv[1], sys.argv[2]
PAPER = 244.0
im = Image.open(src).convert("L")
a = np.asarray(im, dtype=np.float32)[:1330, :]            # crop top 1330 rows
# tone curve (same grade as before): lifts the studio backdrop to about paper
xs = np.array([0, 0.5, 0.87, 1.0]) * 255; ys = np.array([0, 0.52, 0.957, 1.0]) * 255
adj = np.interp(a, xs, ys)
# backdrop = bright, low-texture region connected to the top/left/right borders
smooth = ndi.gaussian_filter(a, 3)
bright = smooth > 200
lab, n = ndi.label(bright)
border = np.zeros_like(bright); border[0, :] = True; border[:900, 0] = True; border[:900, -1] = True
keep = np.unique(lab[border & bright]); keep = keep[keep != 0]
mask = np.isin(lab, keep)
mask = ndi.binary_erosion(mask, iterations=2, border_value=1)             # stay off hair edges
soft = ndi.gaussian_filter(mask.astype(np.float32), 2.5)
res = adj * (1 - soft) + PAPER * soft
Image.fromarray(np.clip(res + 0.5, 0, 255).astype(np.uint8)).save(out, quality=95, subsampling=0)
Image.fromarray((soft * 255).astype(np.uint8)).save(out.replace(".jpg", "-mask.png"))
print("backdrop share", round(float(mask.mean()), 3))
