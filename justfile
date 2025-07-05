default:
    @echo "Listing available tasks..."
    @just --list

build:
    src/tailwindcss -i src/main.css -o static/css/main.css --minify
    zola build

dev:
    src/tailwindcss -i src/main.css -o static/css/main.css --minify
    zola serve
