+++
title = "Creating Content: Pages and Sections"
weight = 1
template = "page.html"
+++

This guide explains how to structure your content in Zola by creating pages and sections. All your content resides in the `content` directory.

## Creating a New Page

To create a new page (e.g., a blog post or an article):

1.  **Use the `zola new` command (Recommended):**
    Run the following command in your terminal:

    ```bash
    zola new path/to/your-page-slug.md
    ```

    Example: To create a page for a new Goyo feature in a `features` section:
    ```bash
    zola new features/amazing-new-feature.md
    ```

2.  **Manually Create a File:**
    Alternatively, you can manually create a `.md` file within the desired location in your `content` directory.

## Page Front Matter

Each page starts with front matter in TOML format, defining its metadata.

```toml
+++
title = "My Awesome New Post"
date = 2023-10-27
description = "A brief description of my awesome new post, great for SEO."

[taxonomies]
categories = ["Tech", "Tutorials"]
tags = ["zola", "goyo", "blogging"]

[extra]
# author = "Your Name"
# show_toc = true
# cover_image = "path/to/cover.jpg"
# cover_alt = "Alt text for cover image"
+++

Your Markdown content starts here...
```

**Common Front Matter Fields:**

- `title`: Page title.
- `date`: Publication date.
- `description`: Page summary (for SEO).
- `[taxonomies]`: Content categorization (e.g., categories, tags).
- `[extra]`: Custom data for the theme or your needs.

## Writing Content

Below the front matter, write your content using Markdown. You can also embed shortcodes.

## Creating a New Section

Sections are directories within your `content` directory that contain an `_index.md` file. This file defines the section's properties and can include content displayed when the section URL is visited.

1.  **Create a Directory:**
    Example: `content/projects/`

2.  **Create `_index.md`:**
    Inside this new directory, create an `_index.md` file.

    **Example `_index.md` for a section:**
    ```toml
    +++
title = "My Projects"
description = "A collection of projects I've worked on."
sort_by = "date"
paginate_by = 5
template = "section.html"
# insert_anchor_links = "left"
+++

This is the introductory content for the "My Projects" section.
It will appear when someone visits `/projects/`.
    ```

**Key `_index.md` Front Matter Fields:**

-   `title`: Section title.
-   `description`: Section description.
-   `sort_by`: How pages within this section are sorted.
-   `paginate_by`: Pagination settings.
-   `template`: Template for the section page itself.
-   `page_template`: Default template for individual pages within this section.
-   `[extra]`: Custom data for the section template.

After creating pages and sections, run `zola serve` to preview your site locally.
