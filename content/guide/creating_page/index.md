+++
title = "Creating Content: Pages and Sections"
weight = 1
template = "page.html"
+++

Zola makes it easy to create new content, whether it's a blog post, a documentation page, or a new section for your site. Content in Zola is organized into **pages** (individual pieces of content like blog posts or articles) and **sections** (which organize pages, like a blog directory or a documentation chapter).

All your content resides in the `content` directory of your Zola project.

## Creating a New Page

To create a new page (e.g., a blog post or a specific documentation article):

1.  **Use the `zola new` command (Recommended):**
    The easiest way to create a new page is by using Zola's `new` command in your terminal. Navigate to the root of your Zola project and run:

    ```bash
    zola new path/to/your-page-slug.md
    ```

    *   Replace `path/to/` with the section path where you want your page to reside. For example, to create a new blog post, you might use `blog/my-new-post.md`.
    *   `your-page-slug.md` is the filename, which also typically serves as the URL slug for the page. Use hyphens for spaces.

    This command will create a new Markdown file at `content/path/to/your-page-slug.md` with some default front matter.

    **Example:** To create a page for a new Goyo feature in a `features` section:
    ```bash
    zola new features/amazing-new-feature.md
    ```
    This creates `content/features/amazing-new-feature.md`.

2.  **Manually Create a File:**
    Alternatively, you can manually create a `.md` file within the desired location in your `content` directory. For example, `content/blog/my-awesome-article.md`.

## Page Front Matter

When you create a new page, it will start with **front matter**, which is a block of TOML, YAML, or JSON at the very beginning of the file, enclosed by `+++` (for TOML), `---` (for YAML), or `{}` (for JSON). Goyo and Zola typically use TOML.

Here's an example of basic front matter for a page:

```toml
+++
title = "My Awesome New Post"
date = 2023-10-27 # The date the page is published
description = "A brief description of my awesome new post, great for SEO."

# Taxonomies (e.g., categories, tags)
[taxonomies]
categories = ["Tech", "Tutorials"]
tags = ["zola", "goyo", "blogging"]

# Extra data specific to your theme or needs
[extra]
# author = "Your Name"
# show_toc = true # Example: to show table of contents for this page
# Goyo specific extras might include things like cover images, etc.
# cover_image = "path/to/cover.jpg"
# cover_alt = "Alt text for cover image"
+++

Your Markdown content starts here...
```

**Common Front Matter Fields:**

*   `title`: The title of your page.
*   `date`: The publication date. Zola can sort pages by date.
*   `description`: A short summary of the page, often used for SEO meta tags.
*   `template`: (Optional) Specifies a different template to use for this page than the default. For regular pages, you usually don't need this as it inherits from the section or theme defaults.
*   `[taxonomies]`: Allows you to categorize or tag your content. You define taxonomies (like `categories` or `tags`) in your main `config.toml`.
*   `[extra]`: A section for any custom data you want to pass to your templates. Themes like Goyo might use this for specific features (e.g., cover images, table of contents visibility, author display). Check the Goyo theme's documentation for available `[extra]` fields.

## Writing Content

Below the front matter, you write your content using Markdown. Zola supports standard Markdown syntax, and you can also embed shortcodes for more complex elements (see the "Shortcodes" guide).

## Creating a New Section

Sections are directories within your `content` directory that have an `_index.md` file. This `_index.md` file defines the properties of the section itself and can also contain content that is displayed when a user navigates to the section URL.

1.  **Create a Directory:**
    For example, to create a "projects" section, make a new directory: `content/projects/`.

2.  **Create `_index.md`:**
    Inside this new directory, create an `_index.md` file: `content/projects/_index.md`.

    **Example `_index.md` for a section:**
    ```toml
    +++
    title = "My Projects"
    description = "A collection of projects I've worked on."
    sort_by = "date"         # How to sort pages in this section (e.g., "date", "weight", "title")
    paginate_by = 5          # (Optional) Number of pages per paginated page in this section
    template = "section.html" # (Optional) Specify a custom template for this section page
    # insert_anchor_links = "left" # (Optional) For auto-generating anchor links for headings
    +++

    This is the introductory content for the "My Projects" section.
    It will appear when someone visits `/projects/`.
    ```

**Key `_index.md` Front Matter Fields:**

*   `title`: The title of the section.
*   `description`: A description for the section.
*   `sort_by`: How pages within this section should be sorted (common options: `date`, `weight`, `title`, `none`). `weight` allows manual ordering.
*   `paginate_by`: If you want to paginate the pages in this section, set the number of pages per paginated page.
*   `template`: (Optional) The template to use to render the section page itself.
*   `page_template`: (Optional) The default template to use for individual pages within this section if they don't specify their own.
*   `[extra]`: Custom data for the section template.

Once you have created your pages and sections, run `zola serve` to preview your site locally and see your new content in action!
