+++
title = "Gitlab"
description = "Deploying to GitLab Pages"
weight = 2
template = "page.html"
+++

GitLab Pages allows you to host static websites from your GitLab repository, integrating with GitLab CI/CD for automated deployments.

## 1. Create and Configure `.gitlab-ci.yml`

Create a `.gitlab-ci.yml` file in your repository root and add the following content to define a CI/CD pipeline that builds and deploys your Zola site.

```yaml
image: alpine:latest

variables:
  ZOLA_VERSION: "0.18.0" # Specify your desired Zola version

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

## 2. Commit and Push `.gitlab-ci.yml`

Commit the file to your repository and push it to GitLab. GitLab CI/CD will automatically run the pipeline to deploy your site.

## 3. Check Pipeline Status and Access Your Site

Monitor the execution status in your GitLab project's **CI/CD > Pipelines**. Once deployed, you can find your site's URL under **Deploy > Pages**.

## Custom Domains

To use a custom domain for your GitLab Pages site:

1.  **Add Custom Domain in GitLab**: In your project's **Deploy > Pages**, click **New Domain** and add your domain. Note the DNS records provided by GitLab.
2.  **Configure DNS**: Add the DNS records provided by GitLab to your domain registrar or DNS provider's website.
3.  **Wait for DNS Propagation**: Once DNS changes propagate, your site will be accessible via your custom domain. Remember to set the `base_url` in your `config.toml` to your custom domain.
