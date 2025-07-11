+++
title = "Deploying to GitHub Pages"
weight = 1
template = "page.html"
+++

GitHub Pages is a popular way to host static websites directly from your GitHub repository. This guide outlines the main methods for deploying your Zola site to GitHub Pages.

## 1. Using GitHub Actions with `actions/deploy-pages` (Recommended)

This is the method currently recommended by GitHub for deployment. It provides a streamlined deployment experience using the `actions/deploy-pages` action.

1.  **Create a Workflow File**: Add the following content to `.github/workflows/deploy.yml` in your repository.

    ```yaml
    name: Deploy Zola site to GitHub Pages

    on:
      push:
        branches:
          - main # Or your default branch

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

2.  **Configure GitHub Pages Settings**: Go to your repository's **Settings** > **Pages** and select **GitHub Actions** as the **Source** under "Build and deployment."

3.  **Push Your Changes**: Commit the `deploy.yml` file and push it to your `main` branch. GitHub Actions will then automatically build and deploy your site.

## 2. Using `shalzz/zola-deploy-action`

This method uses `shalzz/zola-deploy-action`, a community-provided action. This action pushes the built site to a `gh-pages` branch. A Personal Access Token (PAT) with `repo` scope might be required.

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

## 3. Manual Deployment to `gh-pages` Branch

If you prefer not to use GitHub Actions, you can build your site locally and push the `public` directory directly to a `gh-pages` branch.

1.  **Build Your Site**: Run `zola build` in your project's root directory.
2.  **Prepare `public` Directory**: Navigate into the `public` directory, initialize Git, and create a `gh-pages` branch.
3.  **Commit and Push**: Add all files in the `public` directory, commit them, and force push to the `gh-pages` branch.
4.  **Configure GitHub Pages Settings**: In your repository's **Settings** > **Pages**, select "Deploy from a branch" and choose the `gh-pages` branch and `/ (root)` folder.