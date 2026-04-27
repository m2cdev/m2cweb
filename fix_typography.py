import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    if filepath.endswith('.css'):
        content = content.replace('font-style: italic;', '')
        content = content.replace('font-style:italic;', '')
    
    else:
        # Preserve not-italic
        content = content.replace('not-italic', '__NOT_ITALIC__')
        
        # Remove italic class
        # Matches " italic ", " italic\"", "\"italic ", " italic'", "'italic "
        content = re.sub(r'\bitalic\b\s*', '', content)
        
        # Restore not-italic
        content = content.replace('__NOT__', 'not-italic') # Actually wait, __NOT_ITALIC__
        content = content.replace('__NOT_ITALIC__', 'not-italic')

        # Replace em dashes
        # If it looks like a comment "/* ... — ... */" or "// ... —"
        # We'll just replace " — " with ", " and "—" with "," for all except if it's "SECTION N — TITLE"
        
        # Let's handle " — "
        lines = content.split('\n')
        new_lines = []
        for line in lines:
            if '—' in line:
                if '/*' in line or '*/' in line or '//' in line or 'SECTION' in line or 'BACKGROUND' in line:
                    line = line.replace(' — ', ' - ')
                    line = line.replace('—', '-')
                else:
                    line = line.replace(' — ', ', ')
                    line = line.replace('—', ',')
            new_lines.append(line)
        content = '\n'.join(new_lines)
        
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")

def walk_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.js', '.jsx', '.ts', '.tsx', '.css')):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    walk_dir('/Users/youssef/Downloads/Map2Close Web/src')
