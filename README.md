# Vert.x Website ![Node.js CI](https://github.com/vertx-web-site/vertx-web-site/workflows/Node.js%20CI/badge.svg)

This repository contains the source of the Vert.x website (https://vertx.io).

## Quickstart

To build the project, before running `npm install`, be sure to have installed `libsass`. On Fedora:

```
sudo dnf install libsass libsass-devel
```

Initialize local copy:

    npm i

Download and extract AsciiDoc source files of the Vert.x documentation:

    npm run update-docs

Start the website in development mode:

    npm run dev

Export a static website:

    npm run build

The website will be exported the `out` directory.

Test the exported website:

    cd out
    npx serve

## Docker

If you don't want to install Node.js, use Docker instead:

```
# Initialize local copy
rm -rf node_modules
docker run -it -v $(pwd):/vertx node:12-slim sh -c "cd /vertx && npm i"

# Download and extract docs
docker run -it -v $(pwd):/vertx openjdk:11-jdk-slim sh -c "cd /vertx/docs && ./gradlew"

# Start website in development mode
docker run -it -v $(pwd):/vertx -p 3000:3000 node:12-slim \
  sh -c "cd /vertx && npm run dev"
```

Alternatively, build a Docker image that runs the static website inside NGINX
(no hot reloading!):

    docker build -t vertx-web-site .
    docker run -it -p 80:80 vertx-web-site

## Automated deployment

The website is currently automatically deployed to https://vertx-web-site.github.io/.
For this, we set up a separate [GitHub repository](https://github.com/vertx-web-site/vertx-web-site.github.io)
with [GitHub Pages](https://pages.github.com/).

We also created a [GitHub Actions Workflow](https://github.com/vertx-web-site/vertx-web-site/actions).
This workflow runs each time a new commit is pushed. It builds the website and completely
replaces the contents of the GitHub Pages repository, which in turn triggers a new
deployment of the website.
