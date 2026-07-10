import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

count = 0

# Read the exact lines we need to replace
old_lines = {}
with open('index.html', 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if i == 979:  # line 980 (0-indexed: 979)
            old_lines['math_gym'] = line.rstrip('\n')
        elif i == 981:  # line 982
            old_lines['math_nongym'] = line.rstrip('\n')
        elif i == 986:  # line 987
            old_lines['pro'] = line.rstrip('\n')
        elif i == 988:  # line 989
            old_lines['eng'] = line.rstrip('\n')
        elif i == 996:  # line 997
            old_lines['vocab'] = line.rstrip('\n')

for k, v in old_lines.items():
    print(f'{k}: {v[:80]}...')

# Apply replacements
replacements = {
    'math_gym': '      tasks.push({ s:\'math\', sub:\'🔢 数学（5h）\', task:\'高数2.5h(11:30-14:00) + 晚间刷题/补旧章1.5h + 线代灵活1h\' });',
    'math_nongym': '      tasks.push({ s:\'math\', sub:\'🔢 数学（4.5h）\', task:\'高数2.5h + 旧章补题/线代0.5h + 晚间刷题/补旧章1.5h\' });',
    'pro': '      tasks.push({ s:\'pro\', sub:\'⚙️ 828 自控（3h）\', task:\'飞哥课+王万良课后题 14:00-17:00 → 看完直接刷真题\' });',
    'eng': '      tasks.push({ s:\'eng\', sub:\'📝 英语（4h）\', task:\'阅读精读2-3篇(≥3h) + 三小课轮换(≤1h) + 柴荣课 | 每日1句翻译拆解\' });',
    'vocab': '      tasks.push({ s:\'eng\', sub:\'📝 单词\', task:\'白天固定30min闪过 + 回酒店快速过 + 扇贝APP碎片\' });',
}

for key, new_line in replacements.items():
    old_line = old_lines[key]
    if old_line in content:
        content = content.replace(old_line, new_line)
        count += 1
        print(f'{key}: OK')
    else:
        print(f'{key}: NOT FOUND')
        # Try to debug
        print(f'  Looking for: {repr(old_line[:60])}')
        if old_line[:30] in content:
            print('  Prefix found in content')
        else:
            print('  Prefix NOT found')

# Also fix the period line
# Find it
idx = content.find('前4天停健身，自控日→非健身作息')
if idx > 0:
    # Find the full line
    line_start = content.rfind('\n', 0, idx) + 1
    line_end = content.find('\n', idx)
    old_period = content[line_start:line_end]
    new_period = old_period.replace('非健身作息（多1h数学）', '免练版（9:00自习室，数学多1h）')
    content = content.replace(old_period, new_period)
    count += 1
    print('period: OK')
else:
    print('period: NOT FOUND')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f'\nTotal: {count} changes')
