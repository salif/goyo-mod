+++
title = "Customization"
weight = 3
sort_by = "weight"

[extra]
+++

This section guides you through customizing the Goyo theme to better suit your needs.

## Configuration File (`config.toml`)

Many aspects of the Goyo theme can be customized directly through your Zola `config.toml` file. Refer to the [Configuration documentation](../configuration/) for a detailed explanation of available options, including:

-   **Site Title and Description**: Basic site information.
-   **Logo and Favicon**: Branding elements.
-   **Navigation Menus**: Customize the top navigation bar.
-   **Footer Content**: Add custom HTML to the footer.
-   **Default Thumbnail**: Set a default image for pages without a specific cover.
-   **Color Scheme**: Choose between dark and light modes.
-   **Google Analytics/Tag Manager**: Integrate analytics.
-   **Comments**: Configure comment systems like Giscus or Utterances.
-   **Sidebar Expansion Depth**: Control the default expansion level of the sidebar.

## Overriding Templates

For more advanced customization, you can override Goyo's default templates. Zola allows you to place files with the same name and path in your project's `templates` directory, and they will take precedence over the theme's templates.

1.  **Identify the Template**: Find the template file you wish to modify in the `templates` directory of the Goyo theme. For example, to change the header, you might look at `templates/macros/header.html`.
2.  **Copy to Your Project**: Copy the identified template file to the exact same path within your project's `templates` directory.
    Example: If you want to modify `templates/macros/header.html`, copy it to `YOUR_PROJECT/templates/macros/header.html`.
3.  **Modify the Copied File**: Make your desired changes to the copied file. Zola will now use your modified version instead of the theme's default.

This method allows you to fine-tune the theme's appearance and behavior without directly altering the theme's source code, making updates easier.

## Custom CSS

You can add your own custom CSS to further style your site.

1.  **Create a CSS file**: Create a new CSS file in your `static/css/` directory (e.g., `static/css/custom.css`).
2.  **Link in `config.toml`**: Add a link to your custom CSS file in the `extra.css` array in your `config.toml`:

    ```toml
    [extra]
    css = [
        "css/main.css",
        "css/custom.css", # Your custom CSS file
    ]
    ```

    Ensure your custom CSS file is listed *after* `main.css` if you intend to override existing styles.

## Custom JavaScript

Similarly, you can add custom JavaScript.

1.  **Create a JS file**: Create a new JavaScript file in your `static/js/` directory (e.g., `static/js/custom.js`).
2.  **Link in `config.toml`**: Add a link to your custom JavaScript file in the `extra.js` array in your `config.toml`:

    ```toml
    [extra]
    js = [
        "js/mermaid.min.js",
        "js/custom.js", # Your custom JavaScript file
    ]
    ```