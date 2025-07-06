+++
title = "Installation"
weight = 1
sort_by = "weight"

[extra]
+++

#### 1. Zola 사이트 생성

```bash
zola init yoursite
cd yoursite
```

#### 2. 테마 추가

Git submodule로 추가:
```bash
git init  # 이미 git 저장소라면 생략
git submodule add https://github.com/hahwul/goyo themes/goyo
git submodule update --init --recursive
git submodule update --remote --merge
```

또는 themes 디렉토리에 직접 클론:
```bash
git clone https://github.com/hahwul/goyo themes/goyo
```

#### 3. 실행

```bash
zola serve
# 브라우저에서 http://localhost:1111 접속
```
