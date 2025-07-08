+++
title = "Deploying to GitHub Pages"
weight = 1
template = "page.html"
+++

GitHub Pages is a popular way to host static websites directly from your GitHub repository. You can deploy your Zola site to GitHub Pages using a few different methods. This guide will cover common approaches, focusing on GitHub Actions for automated deployment.

## Method 1: Using GitHub Actions with `actions/deploy-pages` (Recommended)

This is the current recommended method by GitHub for deploying to GitHub Pages. It uses the official `actions/deploy-pages` action for a streamlined experience.

1.  **Create a Workflow File:**
    In your repository, create a new file at `.github/workflows/deploy.yml`.

2.  **Add Workflow Configuration:**
    Paste the following configuration into `deploy.yml`. This workflow triggers on pushes to the `main` branch, checks out your code, sets up Zola (you can specify the version), builds your site, and then deploys the `public` directory using `actions/deploy-pages`.

    ```yaml
    name: Deploy Zola site to GitHub Pages

    on:
      push:
        branches:
          - main # Or your default branch, e.g., master

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
              zola-version: "0.18.0" # Specify your desired Zola version, or "latest"
          - name: Build
            run: zola build
          - name: Upload artifact
            uses: actions/upload-pages-artifact@v3
            with:
              path: public # Zola's default output directory

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

3.  **Configure GitHub Pages Settings:**
    *   Go to your repository's **Settings** tab.
    *   In the left sidebar, click on **Pages** (under "Code and automation").
    *   Under "Build and deployment", for the **Source**, select **GitHub Actions**.

4.  **Push Your Changes:**
    Commit the `deploy.yml` file and push it to your `main` (or default) branch. GitHub Actions will now automatically build and deploy your site. Your site will be available at `https://<YOUR_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/`. If you are using a custom domain, it will be available there once DNS is configured.

## Method 2: Using `shalzz/zola-deploy-action`

The [shalzz/zola-deploy-action](https://github.com/shalzz/zola-deploy-action) is another community-provided GitHub Action specifically for Zola sites. The original Goyo documentation mentioned this method.

Here's an example workflow using this action:

```yaml
name: Build and deploy GH Pages (using shalzz/zola-deploy-action)

on:
  push:
    branches:
      - main # Or your default branch

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      # If you use a CNAME file for a custom domain, you might add it here.
      # Example for goyo.hahwul.com:
      # - name: Add CNAME file
      #   run: echo "goyo.hahwul.com" > static/CNAME

      - name: Build and Deploy
        uses: shalzz/zola-deploy-action@v0.20.0 # Or latest version
        env:
          # The branch the action should deploy to.
          PAGES_BRANCH: gh-pages
          # The GitHub token secret.
          # You need to create a secret in your repository settings (e.g., GH_TOKEN)
          # with a Personal Access Token (PAT) that has `repo` scope.
          # Alternatively, for public repos, you might be able to use the default GITHUB_TOKEN
          # if the action supports it and permissions are correctly set.
          # However, for pushing to a branch like gh-pages, a PAT is often required.
          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }} # Replace GH_TOKEN with your secret name
```

**Important notes for `shalzz/zola-deploy-action`:**
*   You'll likely need to create a Personal Access Token (PAT) with `repo` scope and add it as a secret (e.g., `GH_TOKEN`) in your repository settings.
*   This action typically pushes the built site to a `gh-pages` branch. You would then configure GitHub Pages in your repository settings to serve from this `gh-pages` branch (Source: "Deploy from a branch").

## Method 3: Manual Deployment to `gh-pages` Branch

If you prefer not to use GitHub Actions, you can build your site locally and push the `public` directory to a `gh-pages` branch.

1.  **Build Your Site:**
    Run `zola build` in your project's root directory.

2.  **Prepare `public` Directory:**
    Navigate into the `public` directory. If it's not a Git repository, initialize it (`git init`, `git checkout -b gh-pages`).

3.  **Commit and Push:**
    Add all files (`git add .`), commit them (`git commit -m "Deploy site"`), add your remote repository (`git remote add origin https://github.com/<USER>/<REPO>.git`), and then force push to the `gh-pages` branch (`git push -u --force origin gh-pages`).

4.  **Configure GitHub Pages Settings:**
    In your repository settings, under Pages, select "Deploy from a branch", choose `gh-pages` and `/ (root)`, then save.

Your site should then be live. For most users, the GitHub Actions method with `actions/deploy-pages` is recommended for its simplicity and integration.
