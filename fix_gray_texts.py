import os
import re

directory = '/Users/youssef/Downloads/Map2Close Web/src/app'
count = 0

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(('.js', '.jsx', '.tsx')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            # replace text-gray-400/500 and text-neutral-400/500 with text-white/80 or similar
            # user wants "no more gray sub text only white" -> let's use text-white opacity-80
            new_content = re.sub(r'text-gray-[3456]00', 'text-white opacity-80', content)
            new_content = re.sub(r'text-neutral-[3456]00', 'text-white opacity-80', new_content)
            
            if content != new_content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                count += 1
                print(f"Updated {filepath}")

print(f"Total files updated: {count}")
