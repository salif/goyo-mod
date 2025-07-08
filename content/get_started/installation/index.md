+++
title = "Installation"
weight = 1
sort_by = "weight"

[extra]
+++

#### 1. Create Zola Site

```bash
zola init yoursite
cd yoursite
```

#### 2. Add Theme

Add as Git submodule:
```bash
git init  # Skip if already a git repository
git submodule add https://github.com/hahwul/goyo themes/goyo
git submodule update --init --recursive
git submodule update --remote --merge
```

Or clone directly into the themes directory:
```bash
git clone https://github.com/hahwul/goyo themes/goyo
```

#### 3. Run

```bash
zola serve
# Access http://localhost:1111 in your browser
```
