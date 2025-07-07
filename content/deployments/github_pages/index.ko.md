+++
title = "Github Pages"
weight = 1
sort_by = "weight"

[extra]
+++

기본적으로 GitHub Pages는 Jekyll(루비 기반 SSG)을 사용하지만 `gh-pages` branch 내 정적 파일을 직접 배포할 수도 있습니다. 이 파일들은 `username.github.io` 또는 `organization.github.io` 라고 불리는 Github 호스팅용 도메인에서 렌더링되며 도메인을 소유한 경우 개인 도메인으로도 호스팅할 수 있습니다.

이러한 작업을 쉽게 진행하기 위해 [https://github.com/shalzz/zola-deploy-action](zola-deploy-action)란 Github Action으로 Zola로 만들어진 페이지를 배포할 수 있습니다. 배포에 사용되는 Github Workflow는 아래와 같습니다.

```yaml
on: push
name: Build and deploy GH Pages
jobs:
  build:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: checkout
        uses: actions/checkout@v4
      - name: build_and_deploy
        uses: shalzz/zola-deploy-action@master
        env:
          # Target branch
          PAGES_BRANCH: gh-pages
          # Provide personal access token
          TOKEN: ${{ secrets.TOKEN }}
```

아래는 제가 이 문서 페이지를 배포하는데 사용한 Github Workflow입니다.

```yaml
name: Zola on GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build:
    name: Publish site
    runs-on: ubuntu-latest
    steps:
      - name: Checkout main
        uses: actions/checkout@v4

      - name: Add CNAME file
        run: echo "goyo.hahwul.com" > static/CNAME

      - name: Build and deploy
        uses: shalzz/zola-deploy-action@v0.20.0
        env:
          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
```

여기서 CNAME을 강제로 주입하는 것을 볼 수 있는데, 이는 테마에 CNAME을 직접 저장하지 않고 배포하기 위한 방법으로 여러분들은 static 디렉토리 내 CNAME을 보관해도 됩니다.
