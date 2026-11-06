#!/usr/bin/env python3
"""Preprocess GitHub-style markdown for pandoc:
- ```math fenced blocks -> $$...$$
- > [!NOTE] alerts -> ::: {.note} fenced divs
"""
import re, sys

text = sys.stdin.read()

# ```math blocks (optionally blockquote-prefixed) -> $$ blocks
def math_sub(m):
    quote, body = m.group(1), m.group(2).strip()
    if quote:
        return '> $$\n> ' + body + '\n> $$'
    return '$$\n' + body + '\n$$'

text = re.sub(r'(?ms)^(> )?```math\r?\n(.*?)^(> )?```', math_sub, text)

# GitHub alerts: consecutive "> " lines starting with "> [!NOTE]"
lines = text.split('\n')
out = []
i = 0
while i < len(lines):
    if lines[i].startswith('> [!NOTE]'):
        i += 1  # skip the marker line itself
        block = []
        while i < len(lines) and (lines[i].startswith('> ') or lines[i] == '>'):
            ln = lines[i]
            block.append(ln[2:] if ln.startswith('> ') else '')
            i += 1
        # drop leading empty lines from blockquote spacing
        while block and block[0] == '':
            block.pop(0)
        while block and block[-1] == '':
            block.pop()
        out.append('::: {.note}')
        out.extend(block)
        out.append(':::')
    else:
        out.append(lines[i])
        i += 1

sys.stdout.write('\n'.join(out))
