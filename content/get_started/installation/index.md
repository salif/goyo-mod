+++
title = "Installation"
description = "How to install Trankwilo and get started."
weight = 1
sort_by = "weight"

[extra]
+++

Trankwilo is a theme for Zola. To use this documentation, you need to install Zola first. You can install it on various operating systems with a simple command like the one below.

```bash
# macOS Example
brew install zola
```

For more details, please refer to the [official installation guide](https://www.getzola.org/documentation/getting-started/installation/) on the Zola website.

Once you have Zola installed, create a new Zola site as follows:

```bash
zola init your-docs
cd docs
```

You can then run the local development server with the `zola serve` command and view your site at `http://127.0.0.1:1111`.

## Install the Trankwilo Theme

The easiest way to install a theme in Zola is to clone it or add it as a submodule into the `themes` subdirectory of your Zola project.

Clone example

```bash
git clone https://codeberg.org/salif/trankwilo themes/trankwilo
```

Submodule example

```bash
git submodule add -b trankwilo https://codeberg.org/salif/trankwilo themes/trankwilo
```

## Update the Trankwilo Theme

If you want to update the Trankwilo theme to the latest version, you can do so easily:

- If you cloned the theme:
  ```bash
  cd themes/trankwilo
  git pull
  ```

- If you added the theme as a submodule:
  ```bash
  git submodule sync
  git submodule update --remote
  ```

This will ensure you always have the latest features and fixes from the Trankwilo theme.

## Set the theme in config.toml

This is the final step. Set the theme in your `config.toml` file to use Trankwilo.

```toml
title = "Your App"
theme = "trankwilo"
```

Now, when you run Zola, it will use the Trankwilo theme.

```bash
zola serve
```

However, since you don't have any content yet, you will only see a blank page with a brilliant color. In the next document, we'll create our first page.
