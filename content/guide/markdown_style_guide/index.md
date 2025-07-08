+++
title = "Markdown Style Guide & Writing Tips"
weight = 2 # Assuming "Creating Content" is weight 1
template = "page.html"
description = "Learn how to use Markdown effectively with the Goyo theme, including styling examples and writing best practices."
extra.show_toc = true
+++

Writing clear and well-structured content is key to a great website. This guide provides examples of common Markdown elements as rendered by the Goyo theme and offers some tips for effective writing.

## Headings

Use headings to structure your content logically. Start with an `<h1>` (which is usually the page title, automatically handled) and use `<h2>` through `<h6>` sequentially.

```markdown
# This is an H1 (Usually the page title)
## This is an H2
### This is an H3
#### This is an H4
##### This is an H5
###### This is an H6
```

**Renders as:**

## This is an H2
### This is an H3
#### This is an H4
##### This is an H5
###### This is an H6

## Paragraphs and Line Breaks

Write paragraphs as normal text. To create a new paragraph, leave a blank line. For a soft line break (a `<br>`), end a line with two or more spaces.

```markdown
This is a paragraph.
It has multiple lines.

This is a new paragraph.

This line has a soft break.
This line is below it.
```

**Renders as:**

This is a paragraph.
It has multiple lines.

This is a new paragraph.

This line has a soft break.
This line is below it.

## Emphasis

You can make text **bold** or *italic*.

```markdown
*Italic text* or _Italic text_
**Bold text** or __Bold text__
***Bold and Italic*** or ___Bold and Italic___
~~Strikethrough text~~
```

**Renders as:**

*Italic text* or _Italic text_
**Bold text** or __Bold text__
***Bold and Italic*** or ___Bold and Italic___
~~Strikethrough text~~

## Lists

### Unordered Lists

Use asterisks (`*`), pluses (`+`), or hyphens (`-`) for unordered lists.

```markdown
* Item 1
* Item 2
  * Sub-item 2.1
  * Sub-item 2.2
- Another item
```

**Renders as:**

* Item 1
* Item 2
  * Sub-item 2.1
  * Sub-item 2.2
- Another item

### Ordered Lists

Use numbers followed by periods.

```markdown
1. First item
2. Second item
   1. Sub-item 2.1
   2. Sub-item 2.2
3. Third item
```

**Renders as:**

1. First item
2. Second item
   1. Sub-item 2.1
   2. Sub-item 2.2
3. Third item

### Task Lists (GitHub Flavored Markdown)

```markdown
- [x] Completed task
- [ ] Incomplete task
```

**Renders as:**

- [x] Completed task
- [ ] Incomplete task

## Links

Create inline links or reference-style links.

```markdown
[This is an inline link to Zola's website](https://www.getzola.org/)

[This is a reference-style link][zola]

[zola]: https://www.getzola.org/ "Zola's Homepage"
```

**Renders as:**

[This is an inline link to Zola's website](https://www.getzola.org/)

[This is a reference-style link][zola]

[zola]: https://www.getzola.org/ "Zola's Homepage"

## Images

Image syntax is similar to links but prefixed with an exclamation mark.

```markdown
![Alt text for the image](https://placehold.co/600x100/png?text=Goyo+Placeholder)
```

**Renders as:**

![Alt text for the image](https://placehold.co/600x100/png?text=Goyo+Placeholder)

*(Note: The Goyo theme ensures images are responsive.)*

## Blockquotes

Use `>` to create blockquotes.

```markdown
> This is a blockquote.
> It can span multiple lines.
>
> > Nested blockquote.
```

**Renders as:**

> This is a blockquote.
> It can span multiple lines.
>
> > Nested blockquote.

## Code

### Inline Code

Wrap code with single backticks.

```markdown
Use the `zola build` command to build your site.
```

**Renders as:**

Use the `zola build` command to build your site.

### Code Blocks (Fenced)

Use triple backticks and specify the language for syntax highlighting.

````markdown
```python
def hello():
  print("Hello, Goyo!")
```

```javascript
console.log("Hello, Goyo!");
```
````

**Renders as:**

```python
def hello():
  print("Hello, Goyo!")
```

```javascript
console.log("Hello, Goyo!");
```

## Horizontal Rule

Use three or more hyphens, asterisks, or underscores on a line by themselves.

```markdown
---
***
___
```

**Renders as:**

---

## Tables

Create tables using pipes (`|`) and hyphens (`-`).

```markdown
| Header 1 | Header 2 | Header 3 |
| :------- | :------: | -------: |
| Align L  | Center A | Align R  |
| Cell 2   | Cell 3   | Cell 4   |
| Cell 5   | Cell 6   | Cell 7   |
```

**Renders as:**

| Header 1 | Header 2 | Header 3 |
| :------- | :------: | -------: |
| Align L  | Center A | Align R  |
| Cell 2   | Cell 3   | Cell 4   |
| Cell 5   | Cell 6   | Cell 7   |

## Footnotes

Create footnotes using `[^label]` and `[^label]: note content`.

```markdown
This is some text with a footnote.[^1]

And another one.[^another]

[^1]: This is the first footnote.
[^another]: This is another footnote. It can contain **Markdown** as well.
```

**Renders as:**

This is some text with a footnote.[^1]

And another one.[^another]

[^1]: This is the first footnote.
[^another]: This is another footnote. It can contain **Markdown** as well.


## Writing Tips for Goyo

1.  **Keep it Clear and Concise:**
    *   Use short sentences and paragraphs.
    *   Get straight to the point. Readers often scan.

2.  **Structure with Headings:**
    *   Use headings (`##`, `###`, etc.) to break up content and create a logical flow. This improves readability and SEO.

3.  **Use Lists:**
    *   Bulleted or numbered lists are easier to scan than long paragraphs of items.

4.  **Emphasize Key Points:**
    *   Use **bold** or *italics* sparingly to highlight important terms or concepts.

5.  **Leverage Shortcodes:**
    *   Goyo comes with shortcodes (like `alert`, `badge`, `mermaid`). Use them to add richer visual elements to your content. Check the "Shortcodes" section of this documentation.

6.  **Write Good Alt Text for Images:**
    *   This is crucial for accessibility (screen readers) and SEO. Describe the image concisely.

7.  **Preview Your Content:**
    *   Use `zola serve` to preview your site locally. Check for formatting issues, broken links, and overall readability.

8.  **Proofread:**
    *   Typos and grammatical errors can undermine credibility. Read through your content before publishing.

By following these Markdown guidelines and writing tips, you can create engaging and easy-to-understand content for your Goyo-powered website.
