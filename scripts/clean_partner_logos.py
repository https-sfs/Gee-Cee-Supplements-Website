from PIL import Image
import os
from collections import deque

DIR = r"C:\Users\Dell\OneDrive\Attachments\Desktop\Gee Cee\website\public\media\partners"


def trim(im, pad=2):
    bbox = im.getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(im.width, r + pad)
    b = min(im.height, b + pad)
    return im.crop((l, t, r, b))


def remove_near_black(im, thresh=40):
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r <= thresh and g <= thresh and b <= thresh:
                px[x, y] = (0, 0, 0, 0)
    return im


def remove_near_white(im, thresh=235):
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r >= thresh and g >= thresh and b >= thresh:
                px[x, y] = (255, 255, 255, 0)
    return im


def flood_remove_bg(im, is_bg):
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    seen = [[False] * w for _ in range(h)]
    q = deque()

    def push(x, y):
        if 0 <= x < w and 0 <= y < h and not seen[y][x]:
            r, g, b, a = px[x, y]
            if is_bg(r, g, b):
                seen[y][x] = True
                q.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    while q:
        x, y = q.popleft()
        px[x, y] = (0, 0, 0, 0)
        for dx, dy in dirs:
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not seen[ny][nx]:
                r, g, b, a = px[nx, ny]
                if is_bg(r, g, b):
                    seen[ny][nx] = True
                    q.append((nx, ny))
    return im


def keep_dark_only(im, thresh=100):
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
            if lum > thresh:
                px[x, y] = (0, 0, 0, 0)
    return im


def save(im, name):
    out = os.path.join(DIR, name)
    im = trim(im)
    im.save(out, "PNG")
    print(f"saved {name} {im.size}")


def main():
    lt = remove_near_black(Image.open(os.path.join(DIR, "larsen-toubro-raw.png")), 35)
    save(lt, "larsen-toubro.png")

    af = remove_near_black(Image.open(os.path.join(DIR, "afcons-raw.png")), 35)
    save(af, "afcons.png")

    gm = remove_near_white(Image.open(os.path.join(DIR, "gammon-raw.png")), 230)
    save(gm, "gammon.png")

    sew = flood_remove_bg(
        Image.open(os.path.join(DIR, "sew-raw.png")),
        lambda r, g, b: r >= 245 and g >= 245 and b >= 245,
    )
    save(sew, "sew.png")

    gy = flood_remove_bg(
        Image.open(os.path.join(DIR, "gayatri-raw.png")),
        lambda r, g, b: r >= 245 and g >= 245 and b >= 245,
    )
    save(gy, "gayatri.png")

    gkc = keep_dark_only(Image.open(os.path.join(DIR, "gkc-raw.png")), 100)
    save(gkc, "gkc.png")

    md = remove_near_white(Image.open(os.path.join(DIR, "modi-builders-raw.png")), 245)
    save(md, "modi-builders.png")

    print("done")


if __name__ == "__main__":
    main()
