+++
title = "Installation"
weight = 1
sort_by = "weight"

[extra]
+++

Goyo 테마를 사용하기 위한 설치 과정입니다.

### 사전 준비
- [Zola](https://www.getzola.org/documentation/getting-started/installation/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)

### 1. Goyo 테마 다운로드

Git을 사용하여 Goyo 테마를 다운로드합니다.

```bash
git clone https://github.com/hahwul/goyo
cd goyo
```

### 2. Tailwind CSS 빌드

Goyo 테마는 Tailwind CSS를 사용합니다. `tailwindcss`를 빌드하여 필요한 CSS 파일을 생성해야 합니다.

```bash
# tailwindcss-cli 설치 (필요 시)
# npm install -g tailwindcss

# CSS 빌드
tailwindcss -i src/main.css -o static/css/main.css --minify
```

> **참고:** `justfile`을 사용하면 더 쉽게 빌드할 수 있습니다.
> ```bash
> just build
> ```

### 3. Zola 사이트 실행

Zola 개발 서버를 실행하여 사이트를 확인합니다.

```bash
zola serve
```

이제 브라우저에서 `http://127.0.0.1:1111`에 접속하여 Goyo 테마가 적용된 사이트를 확인할 수 있습니다.

### 4. 나만의 콘텐츠로 채우기

`content` 디렉토리의 내용을 삭제하고 자신의 마크다운 파일들로 채워넣으세요.

```bash
rm -rf content/*
# 이제 content 디렉토리에 자신의 글을 작성하세요.
```

### 5. `config.toml` 설정

Goyo 테마의 `config.toml` 파일을 자신의 사이트에 맞게 수정하세요. 특히 `base_url`, `title`, `description` 등의 기본 정보와 `[extra]` 섹션의 값들을 확인하고 변경해야 합니다.