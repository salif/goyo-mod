+++
title = "Github"
description = "GitHub Pages에 배포하기"
weight = 1
template = "page.html"
+++

GitHub Pages는 GitHub 저장소에서 정적 웹사이트를 호스팅하는 방법입니다. Zola 사이트를 GitHub Pages에 배포하는 주요 방법을 안내합니다.

## 1. GitHub Actions와 `actions/deploy-pages` 사용 (권장)

GitHub에서 권장하는 배포 방식입니다. `actions/deploy-pages` 액션을 사용하여 간소화된 배포 환경을 제공합니다.

1.  **워크플로우 파일 생성**: 저장소의 `.github/workflows/deploy.yml` 경로에 다음 내용을 추가합니다.

    ```yaml
    name: Zola 사이트를 GitHub Pages에 배포

    on:
      push:
        branches:
          - main # 또는 기본 브랜치

    permissions:
      contents: read
      pages: write
      id-token: write

    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout
            uses: actions/checkout@v4
          - name: Setup Zola
            uses: taiki-e/setup-zola-action@v1
            with:
              zola-version: "0.18.0" # 원하는 Zola 버전 지정 또는 "latest"
          - name: Build
            run: zola build
          - name: Upload artifact
            uses: actions/upload-pages-artifact@v3
            with:
              path: public # Zola의 기본 출력 디렉토리

      deploy:
        needs: build
        runs-on: ubuntu-latest
        environment:
          name: github-pages
          url: ${{ steps.deployment.outputs.page_url }}
        steps:
          - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v4
    ```

2.  **GitHub Pages 설정 구성**: 저장소 **Settings** > **Pages**에서 "Build and deployment" 아래 **Source**를 **GitHub Actions**로 선택합니다.

3.  **변경 사항 푸시**: `deploy.yml` 파일을 커밋하고 `main` 브랜치에 푸시하면 GitHub Actions가 자동으로 사이트를 빌드하고 배포합니다.

## 2. `shalzz/zola-deploy-action` 사용

커뮤니티에서 제공하는 `shalzz/zola-deploy-action`을 사용하는 방법입니다. 이 액션은 빌드된 사이트를 `gh-pages` 브랜치로 푸시합니다. `repo` 스코프를 가진 Personal Access Token (PAT)이 필요할 수 있습니다.

```yaml
name: Build and deploy GH Pages (using shalzz/zola-deploy-action)

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Build and Deploy
        uses: shalzz/zola-deploy-action@v0.20.0
        env:
          PAGES_BRANCH: gh-pages
          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
```

## 3. `gh-pages` 브랜치로 수동 배포

GitHub Actions를 사용하지 않고 로컬에서 빌드 후 `gh-pages` 브랜치에 직접 푸시하는 방법입니다.

1.  **사이트 빌드**: 프로젝트 루트에서 `zola build` 실행.
2.  **`public` 디렉토리 준비**: `public` 디렉토리로 이동하여 Git 초기화 및 `gh-pages` 브랜치 생성.
3.  **커밋 및 푸시**: `public` 디렉토리의 모든 파일을 커밋하고 `gh-pages` 브랜치에 강제 푸시.
4.  **GitHub Pages 설정 구성**: 저장소 **Settings** > **Pages**에서 "Deploy from a branch"를 선택하고 `gh-pages` 브랜치와 `/ (root)` 폴더를 선택.
