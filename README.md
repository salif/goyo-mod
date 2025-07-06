# goyo (고요)

## Features

* [x] Dark, Light Themes.
* [x] Search support.
* [x] Multi-language support.
* [ ] PWA support.
* [x] SEO support.
* [x] Table of Contents support.
* [x] Responsive design.
* Shortcodes
  * [x] Mermaid chart
  * [x] 4 alert boxes
  * [x] 7 badges

## Installation

Make your zola app

```bash
zola init yoursite
cd yoursite
```

Add the theme as a git submodule:

```bash
git init  # if your project is a git repository already, ignore this command
git submodule add https://github.com/hahwul/goyo themes/goyo
git submodule update --init --recursive
git submodule update --remote --merge
```

Or clone the theme into your themes directory:

```bash
git clone https://github.com/hahwul/goyo themes/goyo
```

## Configuration

Add extra field in config.toml

```toml
logo_text = "Goyo"
logo_image_path = "images/goyo.png"
footer_html = "Powered by <a href='https://www.getzola.org'>Zola</a> and <a href='https://github.com/hahwul/goyo'>Goyo</a>"
default_thumbnail = "images/default_thumbnail.jpg"
twitter_site = "@hahwul"
twitter_creator = "@hahwul"
nav = [
    { name = "Home", url = "/" },
    { name = "GitHub", url = "https://github.com/hahwul/goyo" },
]
```

## Run

```bash
zola serve

# and open http://localhost:1111 in your browser.
```
