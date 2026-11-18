"""Generate the tapered underline drawn beneath "Kdentee" in the home hero.

Prints the SVG path for a 212 x 16 viewBox: a filled, variable-width stroke with round ends:
a little slimmer where it starts, fullest early on, slimmer again where it finishes. Paste it into
components/ui/DrawnUnderline.tsx.
usage: python docs/underline-path.py
"""
import math

W, H = 212.0, 16.0
X0, X1 = 4.6, 206.6          # stroke runs between these x positions
HMAX = 3.85                  # half of the maximum thickness, in viewBox units
N = 30                       # samples per edge

def spine(t):                # an arc: sags through the middle, then lifts into the tail
    x = X0 + (X1 - X0) * t
    y = 6.0 + 3.25 * math.sin(math.pi * t) - 2.4 * t ** 2
    return x, y

def smooth(x):
    x = min(max(x, 0.0), 1.0); return x * x * (3 - 2 * x)

def half_width(t):           # round at both ends: a little slimmer at the start, fullest early, slimmer again at the end
    rise = 0.62 + 0.38 * smooth(t / 0.30)
    fall = 1.0 - 0.50 * smooth((t - 0.45) / 0.55)
    return HMAX * rise * fall

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

K = 0.5523                   # cubic approximation of a quarter circle

def cap(t, forward):         # half-round end: from one edge, around the tip, to the other edge
    (cx, cy), (nx, ny), r = spine(t), normal(t), half_width(t)
    dx, dy = (ny, -nx) if forward else (-ny, nx)          # along the stroke, away from its body
    s1 = -1 if forward else 1                              # which edge the cap starts from
    a = (cx + s1 * nx * r, cy + s1 * ny * r); b = (cx - s1 * nx * r, cy - s1 * ny * r)
    tip = (cx + dx * r, cy + dy * r)
    return ("C%.2f %.2f %.2f %.2f %.2f %.2f" % (a[0] + dx * K * r, a[1] + dy * K * r, tip[0] + s1 * nx * K * r, tip[1] + s1 * ny * K * r, *tip)
            + "C%.2f %.2f %.2f %.2f %.2f %.2f" % (tip[0] - s1 * nx * K * r, tip[1] - s1 * ny * K * r, b[0] + dx * K * r, b[1] + dy * K * r, *b))

top, bot = edge(-1), edge(+1)
shape = ["M%.2f %.2f" % top[0]] + catmull(top) + [cap(1.0, True)] + catmull(bot[::-1]) + [cap(0.0, False), "Z"]
print("".join(shape))
