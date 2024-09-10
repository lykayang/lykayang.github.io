这是一个排序脚注的python脚本

```python

import re

# 读取markdown文件
with open('1.md', 'r', encoding='utf-8') as file:
    content = file.read()

# 找到所有的脚注格式 [^数字]
footnotes = re.findall(r'\[\^(\d+)\]', content)

# 生成从1开始的新的序号列表，确保唯一性
mapping = {}
new_index = 1

# 对所有脚注按顺序分配新编号，即使重复的也要重新编号
for old_num in footnotes:
    mapping[(old_num, new_index)] = str(new_index)
    new_index += 1

# 替换脚注时，确保每个脚注都是唯一的
def replace_footnotes(match):
    old_num = match.group(1)
    key = next(key for key in mapping if key[0] == old_num)
    new_num = mapping.pop(key)
    return f"[^{new_num}]"

new_content = re.sub(r'\[\^(\d+)\]', replace_footnotes, content)

# 写入新的markdown文件
with open('1_reordered.md', 'w', encoding='utf-8') as file:
    file.write(new_content)

print("脚注重新排序完成并已保存为 about_reordered.md")

```

---

原文
```python
<a id="footnote1"></a><a href="#bookmark0">1</a>
```

查找
```python
<a id="footnote(\d+)"></a><a href="#bookmark\d+">\d+</a>
```
替换为
```python
换[^$1]
```

---

原文
```python
<a href="#footnote13">13</a><a id="bookmark12"></a>
```

查找

```python
<a href="#footnote(\d+)">\d+</a><a id="bookmark\d+"></a>
```

替换为
```python
 [^$1]
```

---

批量替换脚注编号
原文
```python
[^1]
```

查找
```python
 \[\^(\d+)\]
```

替换为
```python
 [\^100\1]
```
 (将所有脚注编号加 100)

