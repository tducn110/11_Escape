import re
with open('src/features/tribe-out/levels.ts', 'r') as f:
    content = f.read()

content = re.sub(r'"boardRows": \d+', '"boardRows": 7', content)
content = re.sub(r'"boardCols": \d+', '"boardCols": 7', content)

with open('src/features/tribe-out/levels.ts', 'w') as f:
    f.write(content)
