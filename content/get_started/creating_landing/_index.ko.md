+++
title = "랜딩 페이지 만들기"
weight = 2
sort_by = "weight"

[extra]
+++

랜딩 페이지는 방문자가 가장 먼저 보게되는 페이지로 일반 페이지와 다르게 `landing.html`로 만들어집니다. 해당 페이지는 `content/_index.md` 경로에 있으며, 다른 언어의 랜딩 페이지를 만들고 싶다면 `content/_index.ko.md`와 같이 파일을 생성하면 됩니다.

## 템플릿 설정

먼저 사용할 템플릿을 지정해야 합니다. 랜딩 페이지의 경우 `landing.html`을 사용해야 합니다.

```toml
template = "landing.html"
```

## 추가 데이터 구성

마크다운 파일의 `extra` 섹션에서 사용자 정의 데이터를 추가할 수 있습니다. 랜딩 페이지의 경우 버전, 랜딩 이미지 및 기능 목록을 설정할 수 있습니다.

```toml
[extra]
version = "v0.1.0"
landing_image = "/images/landing.jpg"
features = [
    { title = "문서 친화적", desc = "깔끔한 문서 작성을 제공합니다.", icon = "fa-solid fa-book" },
    { title = "심플한 디자인", desc = "미니멀리즘을 추구하는 테마입니다.", icon = "fa-solid fa-minimize" },
    { title = "빠른 속도", desc = "느린건 싫어요.", icon = "fa-solid fa-bolt" },
    { title = "SEO 최적화", desc = "검색 엔진에 최적화된 구조를 제공합니다.", icon = "fa-solid fa-magnifying-glass-chart" },
    { title = "다양한 Shortcode 지원", desc = "여러가지 유용한 숏코드를 제공합니다.", icon = "fa-solid fa-code" },
    { title = "Dark & Light Mode", desc = "다크 모드와 라이트 모드를 모두 지원합니다.", icon = "fa-solid fa-circle-half-stroke" },
]
```

### 기능

`features`는 랜딩 페이지에 표시될 항목의 목록입니다. 각 기능에는 `title`, `desc` (설명) 및 `icon`이 있습니다. [Font Awesome](https://fontawesome.com/)의 모든 아이콘을 사용할 수 있습니다.

## 콘텐츠 추가

마지막으로 마크다운 파일의 본문에 랜딩 페이지에 표시할 콘텐츠를 추가할 수 있습니다.

```markdown
Goyo에 오신 걸 환영합니다! 한국어 "고요하다"에서 영감을 받은 Zola 테마로 심플함과 깔끔한 문서를 목표로 합니다. Goyo와 함께라면 멋지고 실용적인 문서 페이지를 쉽게 만들 수 있습니다.

문서를 살펴보며 설치와 설정, 그리고 나만의 Goyo를 만드는 팁을 확인해보세요!
```
