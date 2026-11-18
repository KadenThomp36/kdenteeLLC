"""Generate the tapered underline drawn beneath "Kdentee" in the home hero.

Prints the SVG path for a 212 x 12 viewBox: a filled, variable-width stroke that is pressed
down at the start, swells, then runs out in a long taper. Paste it into
components/ui/DrawnUnderline.tsx.
usage: python docs/underline-path.py
"""
import math

W, H = 212.0, 12.0
X0, X1 = 2.0, 209.0          # stroke runs between these x positions
HMAX = 2.45                  # half of the maximum thickness, in viewBox units
N = 18                       # samples per edge

def spine(t):                # a relaxed line: settles slightly, then lifts into the tail
    x = X0 + (X1 - X0) * t
    y = 6.3 + 1.0 * math.sin(2.3 * t) - 3.3 * t ** 2.2
    return x, y

def half_width(t):           # pen pressure: lands with some weight, swells early, long fine taper
    swell = math.sin(math.pi * t ** 0.62) ** 0.85 if 0 < t < 1 else 0.0
    landing = 0.42 * (1 - t) ** 3
    tail = (1 - t ** 2.6) ** 1.05
    return HMAX * max(swell, landing) * tail + 0.0

def normal(t, e=1e-3):
    x0, y0 = spine(max(t - e, 0)); x1, y1 = spine(min(t + e, 1))
    dx, dy = x1 - x0, y1 - y0; L = math.hypot(dx, dy)
    return -dy / L, dx / L

def edge(sign):
    pts = []
    for i in range(N + 1):
        t = i / N
        (x, y), (nx, ny), h = spine(t), normal(t), half_width(t)
        pts.append((x + sign * nx * h, y + sign * ny * h))
    return pts

def catmull(pts):            # smooth cubic Bezier segments through the points
    out = []
    for i in range(len(pts) - 1):
        p0 = pts[max(i - 1, 0)]; p1 = pts[i]; p2 = pts[i + 1]; p3 = pts[min(i + 2, len(pts) - 1)]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        out.append("C%.2f %.2f %.2f %.2f %.2f %.2f" % (*c1, *c2, *p2))
    return out

top, bot = edge(-1), edge(+1)
r = half_width(0)            # rounded landing at the start
shape = ["M%.2f %.2f" % top[0]] + catmull(top) + catmull(bot[::-1])
shape.append("C%.2f %.2f %.2f %.2f %.2f %.2f" % (bot[0][0] - r * 1.33, bot[0][1], top[0][0] - r * 1.33, top[0][1], *top[0]))
shape.append("Z")
print("".join(shape))
