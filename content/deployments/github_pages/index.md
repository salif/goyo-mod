+++
title = "GitHub Pages"
weight = 1
sort_by = "weight"

[extra]
+++

By default, GitHub Pages uses Jekyll (a Ruby-based SSG), but you can also directly deploy static files from a `gh-pages` branch. These files are rendered on a GitHub-hosted domain like `username.github.io` or `organization.github.io`. If you own a domain, you can also host your site on a custom domain.

To simplify this process, you can deploy your Zola-built site using a GitHub Action called [zola-deploy-action](https://github.com/shalzz/zola-deploy-action). The GitHub Workflow for deployment is as follows.

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

However, since the Goyo theme uses Tailwind CSS, it's recommended to optimize by minifying the CSS before deployment. Below is the GitHub Workflow I use to deploy this documentation page.

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

      - name: Minify tailwindcss
        run: src/tailwindcss -i src/main.css -o static/css/main.css --minify

      - name: Add CNAME file
        run: echo "goyo.hahwul.com" > static/CNAME

      - name: Build and deploy
        uses: shalzz/zola-deploy-action@v0.20.0
        env:
          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
```

You'll notice that the CNAME file is being forcibly injected in the workflow. This is a way to handle deployment without storing the CNAME file directly in the theme. Alternatively, you can simply keep the CNAME file in your `static` directory.
