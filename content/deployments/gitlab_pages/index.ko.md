+++
title = "Gitlab"
description = "GitLab Pages에 배포하기"
weight = 2
template = "page.html"
+++

GitLab Pages는 GitLab 저장소에서 정적 웹사이트를 호스팅하며, GitLab CI/CD와 통합하여 배포를 자동화합니다.

## 1. `.gitlab-ci.yml` 파일 생성 및 구성

저장소 루트에 `.gitlab-ci.yml` 파일을 생성하고 다음 내용을 추가하여 Zola 사이트를 빌드하고 배포하는 CI/CD 파이프라인을 정의합니다.

```yaml
image: alpine:latest

variables:
  ZOLA_VERSION: "0.18.0" # 원하는 Zola 버전 지정

pages:
  stage: deploy
  script:
    - apk add --no-cache curl
    - export ZOLA_DOWNLOAD_URL="https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-musl.tar.gz"
    - curl -L "${ZOLA_DOWNLOAD_URL}" | tar xz -C /usr/local/bin
    - zola build
  artifacts:
    paths:
      - public
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
  environment:
    name: production
    url: https://${CI_PROJECT_NAMESPACE}.gitlab.io/${CI_PROJECT_NAME}
```

## 2. `.gitlab-ci.yml` 커밋 및 푸시

파일을 저장소에 커밋하고 GitLab으로 푸시합니다. GitLab CI/CD가 자동으로 파이프라인을 실행하여 사이트를 배포합니다.

## 3. 파이프라인 상태 확인 및 사이트 접속

GitLab 프로젝트의 **CI/CD > 파이프라인**에서 실행 상태를 확인합니다. 배포가 완료되면 **배포 > Pages**에서 사이트 URL을 확인할 수 있습니다.

## 사용자 정의 도메인

GitLab Pages 사이트에 사용자 정의 도메인을 사용하려면:

1.  **GitLab에서 사용자 정의 도메인 추가**: 프로젝트의 **배포 > Pages**에서 **새 도메인**을 클릭하고 도메인을 추가합니다. GitLab이 제공하는 DNS 레코드를 확인합니다.
2.  **DNS 구성**: 도메인 등록기관 또는 DNS 공급자 웹사이트에서 GitLab이 제공한 DNS 레코드를 추가합니다.
3.  **DNS 전파 대기**: DNS 변경 사항이 전파되면 사이트가 사용자 정의 도메인을 통해 액세스 가능해집니다. `config.toml`의 `base_url`을 사용자 정의 도메인으로 설정하는 것을 잊지 마세요.
