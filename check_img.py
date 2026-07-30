from PIL import Image

img = Image.open('public/background/phone.png')
print(f"Size: {img.size}")
img.thumbnail((32, 32))
pixels = list(img.getdata())
# Print a tiny ascii art
chars = " .:-=+*#%@"
for y in range(img.height):
    row = ""
    for x in range(img.width):
        r, g, b = pixels[y * img.width + x][:3]
        lum = (r + g + b) / 3
        row += chars[int(lum / 256 * len(chars))]
    print(row)
