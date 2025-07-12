+++
title = "사용자 정의"
weight = 3
sort_by = "weight"

[extra]
+++

이 섹션에서는 Goyo 테마를 사용자 요구에 맞게 사용자 정의하는 방법을 안내합니다.

## 설정 파일 (`config.toml`)

Goyo 테마의 많은 부분은 Zola의 `config.toml` 파일을 통해 직접 사용자 정의할 수 있습니다. 사용 가능한 옵션에 대한 자세한 설명은 [설정 문서](../configuration/)를 참조하십시오. 다음을 포함합니다:

-   **사이트 제목 및 설명**: 기본적인 사이트 정보.
-   **로고 및 파비콘**: 브랜딩 요소.
-   **내비게이션 메뉴**: 상단 내비게이션 바를 사용자 정의합니다.
-   **푸터 내용**: 푸터에 사용자 정의 HTML을 추가합니다.
-   **기본 썸네일**: 특정 커버가 없는 페이지에 대한 기본 이미지를 설정합니다.
-   **색상 구성표**: 다크 모드와 라이트 모드 중에서 선택합니다.
-   **Google Analytics/Tag Manager**: 분석을 통합합니다.
-   **댓글**: Giscus 또는 Utterances와 같은 댓글 시스템을 구성합니다.
-   **사이드바 확장 깊이**: 사이드바의 기본 확장 수준을 제어합니다.

## 템플릿 오버라이딩

더 고급 사용자 정의를 위해 Goyo의 기본 템플릿을 오버라이드할 수 있습니다. Zola는 프로젝트의 `templates` 디렉토리에 동일한 이름과 경로를 가진 파일을 배치하면 테마의 템플릿보다 우선하도록 허용합니다.

1.  **템플릿 식별**: Goyo 테마의 `templates` 디렉토리에서 수정하려는 템플릿 파일을 찾습니다. 예를 들어, 헤더를 변경하려면 `templates/macros/header.html`을 살펴볼 수 있습니다.
2.  **프로젝트로 복사**: 식별된 템플릿 파일을 프로젝트의 `templates` 디렉토리 내의 정확히 동일한 경로로 복사합니다.
    예시: `templates/macros/header.html`을 수정하려면 `YOUR_PROJECT/templates/macros/header.html`로 복사합니다.
3.  **복사된 파일 수정**: 복사된 파일에 원하는 변경 사항을 적용합니다. 이제 Zola는 테마의 기본값 대신 수정된 버전을 사용합니다.

이 방법을 사용하면 테마의 소스 코드를 직접 변경하지 않고도 테마의 모양과 동작을 세밀하게 조정할 수 있어 업데이트가 더 쉬워집니다.

## 사용자 정의 CSS

사이트 스타일을 추가로 지정하기 위해 자신만의 사용자 정의 CSS를 추가할 수 있습니다.

1.  **CSS 파일 생성**: `static/css/` 디렉토리에 새 CSS 파일을 생성합니다 (예: `static/css/custom.css`).
2.  **`config.toml`에 링크**: `config.toml`의 `extra.css` 배열에 사용자 정의 CSS 파일에 대한 링크를 추가합니다:

    ```toml
    [extra]
    css = [
        "css/main.css",
        "css/custom.css", # 사용자 정의 CSS 파일
    ]
    ```

    기존 스타일을 오버라이드하려면 사용자 정의 CSS 파일이 `main.css` *뒤에* 나열되어 있는지 확인하십시오.

## 사용자 정의 JavaScript

마찬가지로 사용자 정의 JavaScript를 추가할 수 있습니다.

1.  **JS 파일 생성**: `static/js/` 디렉토리에 새 JavaScript 파일을 생성합니다 (예: `static/js/custom.js`).
2.  **`config.toml`에 링크**: `config.toml`의 `extra.js` 배열에 사용자 정의 JavaScript 파일에 대한 링크를 추가합니다:

    ```toml
    [extra]
    js = [
        "js/mermaid.min.js",
        "js/custom.js", # 사용자 정의 JavaScript 파일
    ]
    ```