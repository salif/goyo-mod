+++
title = "콘텐츠 생성하기: 페이지와 섹션"
weight = 1
template = "page.html"
+++

Zola에서 페이지와 섹션을 생성하여 콘텐츠를 구성하는 방법을 안내합니다. 모든 콘텐츠는 `content` 디렉토리에 위치합니다.

## 새 페이지 만들기

새 페이지(블로그 게시물, 문서 등)를 만드는 방법입니다.

1.  **`zola new` 명령어 사용 (권장):**
    터미널에서 다음 명령어를 실행합니다.

    ```bash
    zola new 경로/페이지-슬러그.md
    ```

    예시: `features` 섹션에 새로운 Goyo 기능 페이지를 만들려면:
    ```bash
    zola new features/멋진-새-기능.md
    ```

2.  **수동으로 파일 만들기:**
    `content` 디렉토리 내 원하는 위치에 직접 `.md` 파일을 생성합니다.

## 페이지 프론트 매터 (Front Matter)

페이지 파일 맨 처음에 TOML 형식으로 프론트 매터를 추가합니다. 이는 페이지의 메타데이터를 정의합니다.

```toml
+++
title = "나의 멋진 새 게시물"
date = 2023-10-27
description = "나의 멋진 새 게시물에 대한 간략한 설명, SEO에 좋습니다."

[taxonomies]
categories = ["기술", "튜토리얼"]
tags = ["zola", "goyo", "블로깅"]

[extra]
# author = "작성자 이름"
# show_toc = true
# cover_image = "경로/커버이미지.jpg"
# cover_alt = "커버 이미지 대체 텍스트"
+++

여기에 마크다운 콘텐츠를 작성합니다...
```

**주요 프론트 매터 필드:**

- `title`: 페이지 제목.
- `date`: 발행 날짜.
- `description`: 페이지 요약 (SEO).
- `[taxonomies]`: 카테고리, 태그 등 콘텐츠 분류.
- `[extra]`: 테마 또는 사용자 정의 데이터.

## 콘텐츠 작성하기

프론트 매터 아래에 마크다운을 사용하여 콘텐츠를 작성합니다. 쇼트코드도 삽입할 수 있습니다.

## 새 섹션 만들기

섹션은 `content` 디렉토리 내에 `_index.md` 파일을 가진 디렉토리입니다. 이 파일은 섹션의 속성을 정의하고 콘텐츠를 포함할 수 있습니다.

1.  **디렉토리 만들기:**
    예시: `content/projects/`

2.  **`_index.md` 만들기:**
    새 디렉토리 안에 `_index.md` 파일을 생성합니다.

    **섹션용 `_index.md` 예시:**
    ```toml
    +++
title = "나의 프로젝트들"
description = "제가 작업한 프로젝트 모음입니다."
sort_by = "date"
paginate_by = 5
template = "section.html"
# insert_anchor_links = "left"
+++

이것은 "나의 프로젝트들" 섹션의 소개 내용입니다.
누군가 `/projects/`를 방문하면 나타납니다.
    ```

**주요 `_index.md` 프론트 매터 필드:**

-   `title`: 섹션 제목.
-   `description`: 섹션 설명.
-   `sort_by`: 섹션 내 페이지 정렬 방법.
-   `paginate_by`: 페이지네이션 설정.
-   `template`: 섹션 페이지 템플릿.
-   `page_template`: 섹션 내 개별 페이지 기본 템플릿.
-   `[extra]`: 섹션 템플릿을 위한 사용자 정의 데이터.

페이지와 섹션을 만든 후 `zola serve`로 로컬에서 미리 볼 수 있습니다.
