"""Generate the marker stroke drawn beneath "Kdentee" in the home hero.

Prints the SVG path for a 212 x 16 viewBox: a filled outline that imitates one pass of a thick
felt-tip pen. The width is nearly constant, with the small variations a hand makes: a little
fuller where the pen lands, a little leaner through the fast middle, round at both ends, and
edges that are not perfectly parallel. Paste the output into components/ui/DrawnUnderline.tsx.
usage: python docs/underline-path.py
"""
import math

X0, X1 = 5.6, 206.4          # the pen travels between these x positions
HALF = 3.6                   # half the nib width, in viewBox units
N = 40                       # samples along the stroke
K = 0.5523                   # cubic approximation of a quarter circle


def smooth(x):
    x = min(max(x, 0.0), 1.0)
    return x * x * (3 - 2 * x)


def spine(t):
    """Path of the pen tip: a shallow, lopsided sag that lifts toward the end, plus hand wobble."""
    x = X0 + (X1 - X0) * t
    sag = 1.9 * math.sin(math.pi * t ** 0.8) * (1 - 0.3 * t)
    lift = 2.1 * t ** 1.7
    wobble = 0.16 * math.sin(7.3 * t + 0.6) + 0.09 * math.sin(17.9 * t + 2.1)
    return x, 6.7 + sag - lift + wobble


def pressure(t):
    """Nib width along the stroke, relative to HALF."""
    landing = 0.07 * (1 - smooth(t / 0.18))            # ink pools a little where the pen lands
    speed = -0.10 * math.sin(math.pi * smooth(t)) ** 2  # leaner through the fast middle
    lift = -0.07 * smooth((t - 0.82) / 0.18)            # eases off as the pen leaves
    return 1.0 + landing + speed + lift


def edge_noise(t, phase):    # each edge wanders slightly on its own, like ink on paper
    return 0.11 * math.sin(11.0 * t + phase) + 0.07 * math.sin(23.0 * t + 1.7 * phase)


def normal(t, e=1e-3):
    x0, y0 = spine(max(t - e, 0)); x1, y1 = spine(min(t + e, 1))
    dx, dy = x1 - x0, y1 - y0; length = math.hypot(dx, dy)
    return -dy / length, dx / length


def edge(sign, phase):
    pts = []
    for i in range(N + 1):
        t = i / N
        (x, y), (nx, ny) = spine(t), normal(t)
        fade = smooth(t / 0.06) * smooth((1 - t) / 0.06)   # no noise at the ends, so the caps join cleanly
        h = HALF * pressure(t) + edge_noise(t, phase) * fade
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


def cap(t, forward):         # half-round end: from one edge, around the tip, to the other edge
    (cx, cy), (nx, ny), r = spine(t), normal(t), HALF * pressure(t)
    dx, dy = (ny, -nx) if forward else (-ny, nx)          # along the stroke, away from its body
    s = -1 if forward else 1                               # which edge the cap starts from
    a = (cx + s * nx * r, cy + s * ny * r); b = (cx - s * nx * r, cy - s * ny * r)
    tip = (cx + dx * r, cy + dy * r)
    return ("C%.2f %.2f %.2f %.2f %.2f %.2f" % (a[0] + dx * K * r, a[1] + dy * K * r, tip[0] + s * nx * K * r, tip[1] + s * ny * K * r, *tip)
            + "C%.2f %.2f %.2f %.2f %.2f %.2f" % (tip[0] - s * nx * K * r, tip[1] - s * ny * K * r, b[0] + dx * K * r, b[1] + dy * K * r, *b))


top, bottom = edge(-1, 0.4), edge(+1, 2.9)
shape = ["M%.2f %.2f" % top[0]] + catmull(top) + [cap(1.0, True)] + catmull(bottom[::-1]) + [cap(0.0, False), "Z"]
print("".join(shape))
