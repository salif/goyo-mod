+++
title = "Creating a Landing Page"
description = "Learn how to create a landing page with Goyo."
weight = 3
sort_by = "weight"

[extra]
+++

The landing page is the first page that visitors see, and it's created with `landing.html`, unlike regular pages. This page is located at `content/_index.md`, and if you want to create a landing page in another language, you can create a file like `content/_index.ko.md`.

## Set the Template

First, you need to specify the template to use. For the landing page, you should use `landing.html`.

```toml
template = "landing.html"
```

## Configure Extra Data

The `extra` section in your Markdown file allows you to add custom data. For the landing page, you can set a version, a landing image, and a list of features.

```toml
[extra]
version = "v0.1.0"
landing_image = "/images/landing.jpg"
features = [
    { title = "Documentation Friendly", desc = "Provides a clean writing experience for documentation.", icon = "fa-solid fa-book" },
    { title = "Simple Design", desc = "A theme that pursues minimalism.", icon = "fa-solid fa-minimize" },
    { title = "Fast Speed", desc = "Fast, because we don't like slow things.", icon = "fa-solid fa-bolt" },
    { title = "SEO Optimized", desc = "Provides a structure optimized for search engines.", icon = "fa-solid fa-magnifying-glass-chart" },
    { title = "Various Shortcodes", desc = "Offers a variety of useful shortcodes.", icon = "fa-solid fa-code" },
    { title = "Dark & Light Mode", desc = "Supports both dark and light modes.", icon = "fa-solid fa-circle-half-stroke" },
]
```

### Features

The `features` are a list of items that will be displayed on the landing page. Each feature has a `title`, `desc` (description), and `icon`. You can use any icon from [Font Awesome](https://fontawesome.com/).

## Add Content

Finally, you can add any content you want to display on the landing page in the body of the Markdown file.

```markdown
Welcome to Goyo! Inspired by the Korean word "Goyohada" (고요하다), meaning calm or serene, Goyo is a Zola theme that aims for simplicity and clean documentation. With Goyo, you can easily create beautiful and practical documentation pages.

Explore the docs to learn about installation, configuration, and tips for customizing your own Goyo!
```
