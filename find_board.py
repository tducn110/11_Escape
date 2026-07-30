import sys
from PIL import Image

def find_board(img_path):
    img = Image.open(img_path).convert('RGB')
    w, h = img.size
    
    # We will look for the yellowish bamboo border color.
    # Alternatively, just look for the bamboo frame on the left and right.
    # A simpler way: print out a small ascii art of the center vertical slice to see where the board is.
    
    slice_x = w // 2
    for y in range(0, h, 20):
        r, g, b = img.getpixel((slice_x, y))
        print(f"Y={y:4d} RGB=({r:3d},{g:3d},{b:3d})", end=" ")
        if r > 150 and g > 150 and b < 100:
            print("<- Bamboo?")
        else:
            print()

print("--- PC ---")
find_board("/home/pro/.gemini/antigravity-cli/brain/fac0df43-31f7-4fe2-bdd3-9a13a4a37b4e/.user_uploaded/uploaded_media_0_1785400052541.png")
print("--- Phone ---")
find_board("/home/pro/.gemini/antigravity-cli/brain/fac0df43-31f7-4fe2-bdd3-9a13a4a37b4e/.user_uploaded/uploaded_media_1_1785400052541.png")
