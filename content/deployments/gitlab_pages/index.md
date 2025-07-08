+++
title = "Deploying to GitLab Pages"
weight = 2 # Adjusted weight to be after GitHub Pages
template = "page.html"
+++

GitLab Pages allows you to host static websites directly from your GitLab repository. It integrates seamlessly with GitLab CI/CD to automate the build and deployment process.

This guide will show you how to configure GitLab CI/CD to build your Zola site and deploy it to GitLab Pages.

## Configuring GitLab CI/CD for Deployment

1.  **Create `.gitlab-ci.yml` file:**
    In the root of your GitLab repository, create a file named `.gitlab-ci.yml`.

2.  **Define the CI/CD Pipeline:**
    Paste the following configuration into your `.gitlab-ci.yml` file. This pipeline defines a single stage (`pages`) that builds your Zola site and deploys the contents of the `public` directory to GitLab Pages.

    ```yaml
    image: alpine:latest # You can use a more specific image with Zola pre-installed if available

    variables:
      ZOLA_VERSION: "0.18.0" # Specify your desired Zola version or use "latest"
      # For custom domains, uncomment and set your domain:
      # GITLAB_PAGES_DOMAIN: "your.custom.domain.com"

    pages: # This job MUST be named 'pages' for GitLab Pages to work
      stage: deploy
      script:
        - apk add --no-cache curl # Install curl to download Zola
        - export ZOLA_DOWNLOAD_URL="https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-musl.tar.gz"
        - echo "Downloading Zola from ${ZOLA_DOWNLOAD_URL}"
        - curl -L "${ZOLA_DOWNLOAD_URL}" | tar xz -C /usr/local/bin
        - zola build
        # If using a custom domain and it's not the default project pages URL (e.g., username.gitlab.io/projectname)
        # and if your Zola site is in a subdirectory (e.g. /blog), you might need to adjust paths
        # or ensure your Zola config's base_url is set correctly for GitLab Pages.
        # For a site at the root of the Pages domain (e.g., username.gitlab.io or custom domain root):
        # No specific move needed if `zola build` outputs to `public/`
      artifacts:
        paths:
          - public # Zola's output directory
      rules:
        - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH # Deploy only when pushing to the default branch (e.g., main or master)
      environment:
        name: production
        url: https://${CI_PROJECT_NAMESPACE}.gitlab.io/${CI_PROJECT_NAME} # Default URL
        # If using a custom domain, the URL might be:
        # url: https://${GITLAB_PAGES_DOMAIN}
        # Or if the project is the user/group main site (e.g. username.gitlab.io):
        # url: https://${CI_PROJECT_NAMESPACE}.gitlab.io
    ```

    **Explanation of the `.gitlab-ci.yml`:**
    *   `image: alpine:latest`: Specifies a lightweight Docker image to run the job.
    *   `variables`:
        *   `ZOLA_VERSION`: Allows you to easily update the Zola version.
    *   `pages` job:
        *   This job **must** be named `pages` for GitLab Pages to recognize it.
        *   `stage: deploy`: Assigns the job to a stage (optional if only one job).
        *   `script`:
            *   Installs `curl`.
            *   Sets and echoes the Zola download URL for clarity.
            *   Downloads the specified Zola release tarball for Linux (musl for Alpine).
            *   Extracts Zola to `/usr/local/bin` to make it executable.
            *   Runs `zola build` to generate your site into the `public` directory.
        *   `artifacts`:
            *   `paths: - public`: Specifies that the `public` directory should be saved as an artifact. GitLab Pages will serve files from this artifact.
        *   `rules`:
            *   This rule ensures that the deployment job only runs when changes are pushed to the default branch of your repository (e.g., `main` or `master`).
        *   `environment`:
            *   Defines the deployment environment and the URL where the site will be accessible. Adjust the `url` based on whether you're using the default GitLab Pages URL, a custom domain, or a user/group site.

3.  **Commit and Push `.gitlab-ci.yml`:**
    Add the `.gitlab-ci.yml` file to your repository, commit it, and push it to GitLab.

4.  **Check Pipeline Status and Access Your Site:**
    *   Go to your project's **CI/CD > Pipelines** page in GitLab to see the pipeline run.
    *   Once the `pages` job completes successfully, your site will be deployed.
    *   You can find the URL for your GitLab Pages site in your project's **Settings > Pages**. By default, it will be something like `https://<YOUR_GITLAB_USERNAME_OR_GROUP>.gitlab.io/<YOUR_PROJECT_NAME>/`.

## Custom Domains

If you want to use a custom domain for your GitLab Pages site:

1.  **Add Custom Domain in GitLab:**
    *   In your GitLab project, go to **Deploy > Pages** (or **Settings > Pages** depending on GitLab version).
    *   Click **New Domain**.
    *   Enter your custom domain (e.g., `www.yourdomain.com` or `blog.yourdomain.com`).
    *   GitLab will provide you with DNS records (usually a CNAME or A record, plus a TXT record for verification) that you need to add to your domain's DNS settings with your domain registrar or DNS provider.

2.  **Configure DNS:**
    *   Go to your domain registrar or DNS provider's website.
    *   Add the DNS records provided by GitLab. This typically involves creating a CNAME record pointing your custom domain to `<YOUR_GITLAB_USERNAME_OR_GROUP>.gitlab.io` or an A record pointing to GitLab Pages' IP address (check GitLab's documentation for the current IP).
    *   Add the TXT record for domain verification.

3.  **Wait for DNS Propagation:**
    DNS changes can take some time to propagate (from a few minutes to 48 hours). GitLab will automatically try to verify your domain and issue an SSL certificate (using Let's Encrypt) once DNS is correctly configured.

Your Zola site should then be accessible via your custom domain. Remember to set the `base_url` in your Zola `config.toml` to your custom domain if you haven't already.
