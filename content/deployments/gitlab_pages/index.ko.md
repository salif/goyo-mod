+++
title = "GitLab Pages에 배포하기"
weight = 2 # GitHub Pages 다음에 오도록 가중치 조정
template = "page.html"
+++

GitLab Pages를 사용하면 GitLab 저장소에서 직접 정적 웹사이트를 호스팅할 수 있습니다. GitLab CI/CD와 원활하게 통합되어 빌드 및 배포 프로세스를 자동화합니다.

이 가이드에서는 Zola 사이트를 빌드하고 GitLab Pages에 배포하도록 GitLab CI/CD를 구성하는 방법을 보여줍니다.

## 배포를 위한 GitLab CI/CD 구성

1.  **`.gitlab-ci.yml` 파일 생성:**
    GitLab 저장소의 루트에 `.gitlab-ci.yml`이라는 파일을 만듭니다.

2.  **CI/CD 파이프라인 정의:**
    다음 구성을 `.gitlab-ci.yml` 파일에 붙여넣습니다. 이 파이프라인은 Zola 사이트를 빌드하고 `public` 디렉토리의 내용을 GitLab Pages에 배포하는 단일 단계(`pages`)를 정의합니다.

    ```yaml
    image: alpine:latest # Zola가 사전 설치된 더 구체적인 이미지를 사용할 수 있다면 그것을 사용해도 됩니다.

    variables:
      ZOLA_VERSION: "0.18.0" # 원하는 Zola 버전을 지정하거나 "latest"를 사용하세요.
      # 사용자 정의 도메인의 경우, 주석을 해제하고 도메인을 설정하세요:
      # GITLAB_PAGES_DOMAIN: "your.custom.domain.com"

    pages: # GitLab Pages가 작동하려면 이 작업의 이름은 반드시 'pages'여야 합니다.
      stage: deploy
      script:
        - apk add --no-cache curl # Zola를 다운로드하기 위해 curl 설치
        - export ZOLA_DOWNLOAD_URL="https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-musl.tar.gz"
        - echo "다음 URL에서 Zola 다운로드 중: ${ZOLA_DOWNLOAD_URL}"
        - curl -L "${ZOLA_DOWNLOAD_URL}" | tar xz -C /usr/local/bin # /usr/local/bin에 Zola 압축 해제
        - zola build # Zola 사이트 빌드
        # 사용자 정의 도메인을 사용하고 기본 프로젝트 페이지 URL(예: username.gitlab.io/projectname)이 아니거나,
        # Zola 사이트가 하위 디렉토리(예: /blog)에 있는 경우 경로를 조정하거나
        # Zola 설정의 base_url이 GitLab Pages에 맞게 올바르게 설정되었는지 확인해야 할 수 있습니다.
        # Pages 도메인의 루트(예: username.gitlab.io 또는 사용자 정의 도메인 루트)에 있는 사이트의 경우:
        # `zola build`가 `public/`으로 출력되면 특별한 이동이 필요하지 않습니다.
      artifacts:
        paths:
          - public # Zola의 출력 디렉토리
      rules:
        - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH # 기본 브랜치(예: main 또는 master)에 푸시할 때만 배포
      environment:
        name: production
        url: https://${CI_PROJECT_NAMESPACE}.gitlab.io/${CI_PROJECT_NAME} # 기본 URL
        # 사용자 정의 도메인을 사용하는 경우 URL은 다음과 같을 수 있습니다:
        # url: https://${GITLAB_PAGES_DOMAIN}
        # 또는 프로젝트가 사용자/그룹 기본 사이트인 경우(예: username.gitlab.io):
        # url: https://${CI_PROJECT_NAMESPACE}.gitlab.io
    ```

    **`.gitlab-ci.yml` 설명:**
    *   `image: alpine:latest`: 작업을 실행할 경량 Docker 이미지를 지정합니다.
    *   `variables`:
        *   `ZOLA_VERSION`: Zola 버전을 쉽게 업데이트할 수 있도록 합니다.
    *   `pages` 작업:
        *   GitLab Pages가 인식하려면 이 작업의 이름은 **반드시** `pages`여야 합니다.
        *   `stage: deploy`: 작업을 단계에 할당합니다 (작업이 하나만 있는 경우 선택 사항).
        *   `script`:
            *   `curl`을 설치합니다.
            *   명확성을 위해 Zola 다운로드 URL을 설정하고 출력합니다.
            *   지정된 Zola 릴리스 tarball(Linux용, Alpine의 경우 musl)을 다운로드합니다.
            *   Zola를 실행 가능하도록 `/usr/local/bin`에 압축을 풉니다.
            *   `zola build`를 실행하여 사이트를 `public` 디렉토리로 생성합니다.
        *   `artifacts`:
            *   `paths: - public`: `public` 디렉토리가 아티팩트로 저장되어야 함을 지정합니다. GitLab Pages는 이 아티팩트에서 파일을 제공합니다.
        *   `rules`:
            *   이 규칙은 저장소의 기본 브랜치(예: `main` 또는 `master`)로 변경 사항이 푸시될 때만 배포 작업이 실행되도록 합니다.
        *   `environment`:
            *   배포 환경과 사이트에 액세스할 수 있는 URL을 정의합니다. 기본 GitLab Pages URL, 사용자 정의 도메인 또는 사용자/그룹 사이트를 사용하는지 여부에 따라 `url`을 조정하세요.

3.  **`.gitlab-ci.yml` 커밋 및 푸시:**
    `.gitlab-ci.yml` 파일을 저장소에 추가하고 커밋한 다음 GitLab으로 푸시합니다.

4.  **파이프라인 상태 확인 및 사이트 접속:**
    *   GitLab에서 프로젝트의 **CI/CD > 파이프라인** 페이지로 이동하여 파이프라인 실행을 확인합니다.
    *   `pages` 작업이 성공적으로 완료되면 사이트가 배포됩니다.
    *   GitLab Pages 사이트의 URL은 프로젝트의 **배포 > Pages** (또는 GitLab 버전에 따라 **설정 > Pages**)에서 찾을 수 있습니다. 기본적으로 `https://<GITLAB_사용자명_또는_그룹명>.gitlab.io/<프로젝트명>/`과 같은 형식입니다.

## 사용자 정의 도메인

GitLab Pages 사이트에 사용자 정의 도메인을 사용하려면:

1.  **GitLab에서 사용자 정의 도메인 추가:**
    *   GitLab 프로젝트에서 **배포 > Pages** (또는 GitLab 버전에 따라 **설정 > Pages**)로 이동합니다.
    *   **새 도메인**을 클릭합니다.
    *   사용자 정의 도메인(예: `www.yourdomain.com` 또는 `blog.yourdomain.com`)을 입력합니다.
    *   GitLab에서 도메인 등록기관 또는 DNS 공급자의 도메인 DNS 설정에 추가해야 하는 DNS 레코드(일반적으로 CNAME 또는 A 레코드와 확인용 TXT 레코드)를 제공합니다.

2.  **DNS 구성:**
    *   도메인 등록기관 또는 DNS 공급자의 웹사이트로 이동합니다.
    *   GitLab에서 제공한 DNS 레코드를 추가합니다. 일반적으로 사용자 정의 도메인을 `<GITLAB_사용자명_또는_그룹명>.gitlab.io`로 가리키는 CNAME 레코드를 만들거나 GitLab Pages의 IP 주소(현재 IP는 GitLab 문서 확인)로 가리키는 A 레코드를 만듭니다.
    *   도메인 확인을 위해 TXT 레코드를 추가합니다.

3.  **DNS 전파 대기:**
    DNS 변경 사항이 전파되는 데 시간이 걸릴 수 있습니다(몇 분에서 48시간까지). DNS가 올바르게 구성되면 GitLab은 자동으로 도메인을 확인하고 SSL 인증서(Let's Encrypt 사용)를 발급하려고 시도합니다.

이제 Zola 사이트가 사용자 정의 도메인을 통해 액세스할 수 있게 됩니다. 아직 설정하지 않았다면 Zola `config.toml`의 `base_url`을 사용자 정의 도메인으로 설정하는 것을 잊지 마세요.
