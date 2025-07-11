+++
title = "Installation"
weight = 1
sort_by = "weight"

[extra]
+++

This is the installation process for using the Goyo theme.

### Prerequisites
- [Zola](https://www.getzola.org/documentation/getting-started/installation/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)

### 1. Download Goyo Theme

Download the Goyo theme using Git.

```bash
git clone https://github.com/hahwul/goyo
cd goyo
```

### 2. Build Tailwind CSS

The Goyo theme uses Tailwind CSS. You need to build `tailwindcss` to generate the necessary CSS files.

```bash
# Install tailwindcss-cli (if needed)
# npm install -g tailwindcss

# Build CSS
tailwindcss -i src/main.css -o static/css/main.css --minify
```

> **Note:** You can build more easily using `justfile`.
> ```bash
> just build
> ```

### 3. Run Zola Site

Run the Zola development server to check the site.

```bash
zola serve
```

Now you can access `http://127.0.0.1:1111` in your browser to see the site with the Goyo theme applied.

### 4. Fill with Your Own Content

Delete the contents of the `content` directory and fill it with your own Markdown files.

```bash
rm -rf content/*
# Now write your own posts in the content directory.
```

### 5. Configure `config.toml`

Modify the Goyo theme's `config.toml` file to fit your site. In particular, you need to check and change basic information such as `base_url`, `title`, `description`, and the values in the `[extra]` section.