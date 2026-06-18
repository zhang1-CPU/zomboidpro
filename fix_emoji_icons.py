import os
import glob

folder = r'c:\Users\23028\Desktop\zhang1-CPU.github.io-main'

# Define all replacement patterns for broken emoji icons in dropdown menus
replacements = [
    # Fix broken icons in Popular dropdown - Map Guides
    ('<span class="dd-icon"></span> Map Guides', '<span class="dd-icon">🗺️</span> Map Guides'),
    ('<span class="dd-icon"></span> Map', '<span class="dd-icon">🗺️</span> Map'),
    
    # Fix broken icons in Popular dropdown - Build 42 Infection System
    ('<span class="dd-icon"></span> Build 42 Infection System', '<span class="dd-icon">🆕</span> Build 42 Infection System'),
    ('<span class="dd-icon"></span> B42 Infection System', '<span class="dd-icon">🆕</span> B42 Infection System'),
    
    # Fix broken icons in Popular dropdown - Beginner Mistakes
    ('<span class="dd-icon"></span> Top 10 Beginner Mistakes', '<span class="dd-icon">🎯</span> Top 10 Beginner Mistakes'),
    ('<span class="dd-icon"></span> Beginner Mistakes', '<span class="dd-icon">🎯</span> Beginner Mistakes'),
    
    # Fix other potentially broken emoji icons
    ('<span class="dd-icon"></span> Disable Zombie Respawn', '<span class="dd-icon">⚙️</span> Disable Zombie Respawn'),
    ('<span class="dd-icon"></span> Population Settings', '<span class="dd-icon">👥</span> Population Settings'),
    ('<span class="dd-icon"></span> Base Building', '<span class="dd-icon">🏠</span> Base Building'),
    ('<span class="dd-icon"></span> PVE Servers', '<span class="dd-icon">🌐</span> PVE Servers'),
    ('<span class="dd-icon"></span> B42 Mod Compatibility', '<span class="dd-icon">🔧</span> B42 Mod Compatibility'),
    
    # Fix any remaining generic broken emoji patterns
    ('<span class="dd-icon"></span>', '<span class="dd-icon">📄</span>'),
]

fixed_files = []
for filepath in glob.glob(os.path.join(folder, '*.html')):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        for old, new in replacements:
            new_content = new_content.replace(old, new)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            fixed_files.append(os.path.basename(filepath))
    except Exception as e:
        print(f'Error processing {filepath}: {e}')

print(f'Fixed {len(fixed_files)} files:')
for f in fixed_files:
    print(f'  - {f}')
