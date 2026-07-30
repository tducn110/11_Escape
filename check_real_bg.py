import sys
from PIL import Image
def check_bg(img_path):
    img = Image.open(img_path).convert('RGB')
    w, h = img.size
    print(f"{img_path} Dimensions: {w}x{h}")
    # Check center slice for PC.png
    slice_x = w // 2
    for y in range(0, h, 20):
        r, g, b = img.getpixel((slice_x, y))
        print(f"Y={y:4d} RGB=({r:3d},{g:3d},{b:3d})")
check_bg("public/background/PC.png")
