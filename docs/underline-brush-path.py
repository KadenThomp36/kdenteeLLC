"""Ink-brush (enso-style) underline: one sweep built from individual bristles.

Where the brush lands the bristles overlap into solid ink; as it travels and lifts they thin
and separate, leaving dry streaks ("flying white") and a ragged tail. Prints one SVG path
(many subpaths, nonzero fill) for an 848 x 64 viewBox (4x the 212 x 16 box, so integer
coordinates keep the path small). Paste the output into components/ui/DrawnUnderline.tsx as
the "brush" variant. The optional argument is a random seed: each seed is a different stroke.
usage: python docs/underline-brush-path.py [seed]
"""
import math, random, sys

S = 4.0                       # coordinate scale
X0, X1 = 3.0, 209.0
HMAX = 5.3                    # half-width of the brush where it is pressed hardest
BRISTLES = 22
SAMPLES = 15
rng = random.Random(int(sys.argv[1]) if len(sys.argv) > 1 else 3)


def smooth(x):
    x = min(max(x, 0.0), 1.0)
    return x * x * (3 - 2 * x)


def spine(t):
    """Path of the brush: a confident shallow arc that lifts as the stroke ends."""
    x = X0 + (X1 - X0) * t
    y = 7.9 + 1.7 * math.sin(math.pi * t ** 0.85) * (1 - 0.3 * t) - 2.9 * t ** 1.8
    return x, y


def envelope(t):
    """Half-width of the whole brush: pressed in fast, eased off steadily, nearly lifted at the end."""
    landing = math.sqrt(max(1 - (1 - min(t / 0.04, 1.0)) ** 2, 0.0))    # round head
    body = 1.0 - 0.26 * smooth((t - 0.06) / 0.30) - 0.26 * smooth((t - 0.45) / 0.55)
    return HMAX * landing * body


def bristle(i):
    u = -1 + 2 * (i + 0.5) / BRISTLES + rng.uniform(-0.25, 0.25) / BRISTLES   # position across the brush
    edge = abs(u)
    start = rng.uniform(0.0, 0.004) + 0.012 * edge ** 2                       # the head is round, barely ragged
    dry = rng.uniform(0.38, 0.72) - 0.10 * edge                               # where its ink starts to run out
    end = min(rng.uniform(0.80, 1.0) - 0.10 * edge ** 2, 1.0)                 # where it leaves the paper
    if rng.random() < 0.26:                                                   # a few bristles go dry early
        dry = rng.uniform(0.12, 0.30); end = min(end, rng.uniform(0.6, 0.95))
    drift = rng.uniform(-0.05, 0.05)
    phase = rng.uniform(0, 6.28)
    ts = [start + (end - start) * (k / (SAMPLES - 1)) ** 0.9 for k in range(SAMPLES)]
    top, bot = [], []
    for t in ts:
        (x, y), h = spine(t), envelope(t)
        ink = 1.0 - 0.93 * smooth((t - dry) / max(end - dry, 1e-3)) ** 0.8
        ink *= smooth((t - start) / 0.012 + 0.6)                              # each bristle touches down fast
        half = (h / BRISTLES) * 1.75 * ink                                    # >1 spacing => solid where inked
        centre = y + (u + drift * t + 0.012 * math.sin(9 * t + phase)) * max(h - half, 0)
        top.append((x, centre - half)); bot.append((x, centre + half))
    pts = top + bot[::-1]
    return "M" + "L".join("%d %d" % (round(px * S), round(py * S)) for px, py in pts) + "Z"


print("".join(bristle(i) for i in range(BRISTLES)))
