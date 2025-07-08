+++
title = "GitHub Pages에 배포하기"
weight = 1
template = "page.html"
+++

GitHub Pages는 GitHub 저장소에서 직접 정적 웹사이트를 호스팅하는 인기 있는 방법입니다. Zola 사이트를 GitHub Pages에 배포하는 몇 가지 다른 방법이 있습니다. 이 가이드에서는 자동화된 배포를 위한 GitHub Actions 사용과 빌드된 사이트를 `gh-pages` 브랜치에 수동으로 푸시하여 배포하는 두 가지 일반적인 접근 방식을 다룹니다.

## 방법 1: GitHub Actions와 `actions/deploy-pages` 사용 (권장)

이것은 GitHub Pages에 배포하기 위해 GitHub에서 현재 권장하는 방법입니다. 간소화된 환경을 위해 공식 `actions/deploy-pages` 액션을 사용합니다.

1.  **워크플로우 파일 생성:**
    저장소의 `.github/workflows/deploy.yml` 경로에 새 파일을 만듭니다.

2.  **워크플로우 설정 추가:**
    다음 설정을 `deploy.yml`에 붙여넣습니다. 이 워크플로우는 `main` 브랜치로 푸시될 때 실행되며, 코드를 체크아웃하고, Zola를 설정한 후(버전 지정 가능), 사이트를 빌드하고 `public` 디렉토리를 `actions/deploy-pages`를 사용하여 배포합니다.

    ```yaml
    name: Zola 사이트를 GitHub Pages에 배포

    on:
      push:
        branches:
          - main # 또는 기본 브랜치 (예: master)

    permissions:
      contents: read
      pages: write
      id-token: write

    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout # 코드 가져오기
            uses: actions/checkout@v4
          - name: Setup Zola # Zola 설정
            uses: taiki-e/setup-zola-action@v1
            with:
              zola-version: "0.18.0" # 원하는 Zola 버전 지정 또는 "latest"
          - name: Build # 빌드
            run: zola build
          - name: Upload artifact # 빌드 결과물 업로드
            uses: actions/upload-pages-artifact@v3
            with:
              path: public # Zola의 기본 출력 디렉토리

      deploy:
        needs: build # 빌드 작업 완료 후 실행
        runs-on: ubuntu-latest
        environment:
          name: github-pages
          url: ${{ steps.deployment.outputs.page_url }}
        steps:
          - name: Deploy to GitHub Pages # GitHub Pages에 배포
            id: deployment
            uses: actions/deploy-pages@v4
    ```

3.  **GitHub Pages 설정 구성:**
    *   저장소의 **Settings** 탭으로 이동합니다.
    *   왼쪽 사이드바에서 **Pages** ("Code and automation" 아래)를 클릭합니다.
    *   "Build and deployment" 아래 **Source**에서 **GitHub Actions**를 선택합니다.

4.  **변경 사항 푸시:**
    `deploy.yml` 파일을 커밋하고 `main` (또는 기본) 브랜치에 푸시합니다. 이제 GitHub Actions가 자동으로 사이트를 빌드하고 배포합니다. 사이트는 `https://<사용자명>.github.io/<저장소명>/` 주소에서 확인할 수 있습니다. 사용자 정의 도메인을 사용하는 경우 DNS 설정 후 해당 도메인에서 사용할 수 있습니다.

## 방법 2: `shalzz/zola-deploy-action` 사용

[shalzz/zola-deploy-action](https://github.com/shalzz/zola-deploy-action)은 Zola 사이트용으로 커뮤니티에서 제공하는 또 다른 GitHub Action입니다. 기존 Goyo 문서에서 이 방법을 언급했습니다.

이 액션을 사용하는 예시 워크플로우는 다음과 같습니다:

```yaml
name: GH Pages 빌드 및 배포 (shalzz/zola-deploy-action 사용)

on:
  push:
    branches:
      - main # 또는 기본 브랜치

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout # 코드 가져오기
        uses: actions/checkout@v4

      # 사용자 정의 도메인용 CNAME 파일을 사용하는 경우 여기에 추가할 수 있습니다.
      # 예시 (goyo.hahwul.com):
      # - name: Add CNAME file
      #   run: echo "goyo.hahwul.com" > static/CNAME

      - name: Build and Deploy # 빌드 및 배포
        uses: shalzz/zola-deploy-action@v0.20.0 # 또는 최신 버전
        env:
          # 액션이 배포할 브랜치
          PAGES_BRANCH: gh-pages
          # GitHub 토큰 시크릿
          # 저장소 설정에서 `repo` 스코프를 가진 Personal Access Token (PAT)으로
          # 시크릿(예: GH_TOKEN)을 생성해야 합니다.
          # 공개 저장소의 경우, 액션이 지원하고 권한이 올바르게 설정되어 있다면
          # 기본 GITHUB_TOKEN을 사용할 수도 있지만,
          # gh-pages와 같은 브랜치에 푸시하려면 PAT가 종종 필요합니다.
          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }} # GH_TOKEN을 시크릿 이름으로 대체
```

**`shalzz/zola-deploy-action` 사용 시 중요 참고 사항:**
*   `repo` 스코프를 가진 Personal Access Token (PAT)을 생성하고 저장소 설정에서 시크릿(예: `GH_TOKEN`)으로 추가해야 할 가능성이 높습니다.
*   이 액션은 일반적으로 빌드된 사이트를 `gh-pages` 브랜치로 푸시합니다. 그런 다음 저장소 설정의 GitHub Pages에서 이 `gh-pages` 브랜치로부터 사이트를 제공하도록 설정해야 합니다 (Source: "Deploy from a branch").

## 방법 3: `gh-pages` 브랜치로 수동 배포

GitHub Actions를 사용하지 않으려면 로컬에서 사이트를 빌드하고 `public` 디렉토리를 `gh-pages` 브랜치에 푸시할 수 있습니다.

1.  **사이트 빌드:**
    프로젝트 루트 디렉토리에서 `zola build` 명령을 실행합니다.

2.  **`public` 디렉토리 준비:**
    `public` 디렉토리로 이동합니다. Git 저장소가 아니라면 초기화합니다 (`git init`, `git checkout -b gh-pages`).

3.  **커밋 및 푸시:**
    모든 파일을 추가하고(`git add .`), 커밋한 후(`git commit -m "사이트 배포"`), 원격 저장소를 추가하고(`git remote add origin https://github.com/<사용자명>/<저장소명>.git`), `gh-pages` 브랜치에 강제 푸시합니다(`git push -u --force origin gh-pages`).

4.  **GitHub Pages 설정 구성:**
    저장소 설정의 Pages에서 "Deploy from a branch"를 선택하고, `gh-pages` 브랜치와 `/ (root)` 폴더를 선택한 후 저장합니다.

이제 사이트가 라이브 상태가 됩니다. 대부분의 사용자에게는 단순성과 통합성을 위해 `actions/deploy-pages`를 사용하는 GitHub Actions 방법이 권장됩니다.
