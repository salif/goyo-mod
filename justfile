#!/usr/bin/env -S just --justfile

export PATH := source_directory() / "node_modules" / ".bin" + PATH_VAR_SEP + env_var("PATH")

default:
    @echo "Listing available tasks..."
    @just --list

build:
    tailwindcss -i src/main.css -o static/css/main.css --minify
    zola build

dev:
    tailwindcss -i src/main.css -o static/css/main.css --minify
    zola serve

update-katex:
    rm -f static/fonts/KaTeX*
    cp node_modules/katex/dist/fonts/* static/fonts/
    cp node_modules/katex/dist/*.min.css static/css/
    cp node_modules/katex/dist/*.min.js static/js/
    sed -i "s|fonts/|../fonts/|g" static/css/katex.min.css

update-mermaid:
    cp node_modules/mermaid/dist/mermaid.min.js static/js/mermaid.min.js

update-fontawesome:
    rm -f static/fonts/fa-*
    cp node_modules/@fortawesome/fontawesome-free/webfonts/* static/fonts/
    cp node_modules/@fortawesome/fontawesome-free/css/all.min.css static/css/font-awesome.min.css
    sed -i "s|../webfonts/|../fonts/|g" static/css/font-awesome.min.css

update-pretendard version="1.3.9": && update-pretendard-variable
    curl -sLo /tmp/PretendardStd-{{ version }}.zip https://github.com/orioncactus/pretendard/releases/download/v{{ version }}/PretendardStd-{{ version }}.zip
    cd /tmp/ && unzip PretendardStd-{{ version }}.zip
    rm -f static/fonts/Pretendard*

[private]
update-pretendard-variable:
    cp /tmp/web/variable/woff2/* static/fonts/
    cat /tmp/web/variable/pretendardvariable-std.css

[private]
update-pretendard-static:
    cp /tmp/web/static/woff/* static/fonts/
    cp /tmp/web/static/woff2/* static/fonts/
    cp /tmp/web/static/pretendard-std.css static/css/
    sed -i "s|./woff2/|../fonts/|g" static/css/pretendard-std.css
    sed -i "s|./woff/|../fonts/|g" static/css/pretendard-std.css

update-dependencies: update-katex update-mermaid update-fontawesome
