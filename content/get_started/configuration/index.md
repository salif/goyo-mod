+++
title = "Configuration"
weight = 2
sort_by = "weight"

[extra]
+++

## Logo
`logo_text` / `logo_image_path`

- `logo_text`: Text displayed when no logo image is present.
- `logo_image_path`: Path to the logo image.

```toml
[extra]
logo_text = "Goyo"
logo_image_path = "images/goyo.png"
```

## Footer
`footer_html`

- `footer_html`: HTML code displayed in the footer.

```toml
[extra]
footer_html = "Powered by <a href='https://www.getzola.org'>Zola</a> and <a href='https://github.com/hahwul/goyo'>Goyo</a>"
```

## Thumbnail
`default_thumbnail`

- `default_thumbnail`: Path to the default thumbnail image.

```toml
[extra]
default_thumbnail = "images/default_thumbnail.jpg"
```

## Twitter
`twitter_site` / `twitter_creator`

- `twitter_site`: Twitter site handle.
- `twitter_creator`: Twitter creator handle.

```toml
[extra]
twitter_site = "@hahwul"
twitter_creator = "@hahwul"
```

## Color
`default_colorset`

- `default_colorset`: Default theme (dark/light).

```toml
[extra]
default_colorset = "dark"
```

## Google Tag
`gtag`

- `gtag`: Google Tag ID.

```toml
[extra]
gtag = "G-XXXXXXXXXX"
```

## Navigations
`nav`

- `nav`: Top navigation menu.

```toml
[extra]
nav = [
    { name = "Documents", url = "/introduction", type = "url" },
    { name = "GitHub", url = "https://github.com/hahwul/goyo", type = "url" },
    { name = "Links", type = "dropdown", members = [
        { name = "Creator Blog", url = "https://www.hahwul.com", type = "url" },
    ] },
]
```

## Comments
`comments`

- `comments`: Comment feature settings (giscus/utterances).

```toml
[extra.comments]
enabled = true
system = "giscus"
repo = "hahwul/goyo"
repo_id = "R_kgDOPHnqwg"
category = "General"
category_id = "DIC_kwDOPHnqws4CspmC"
mapping = "pathname"
strict = "0"
reactions_enabled = "1"
emit_metadata = "0"
input_position = "bottom"
theme = "catppuccin_mocha"
lang = "en"
```