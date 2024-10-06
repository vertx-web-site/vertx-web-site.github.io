# Vert.x Website ![Deploy](https://github.com/vertx-web-site/vertx-web-site.github.io/workflows/Deploy/badge.svg)

This repository contains the source of the Vert.x website (https://vertx.io).

## Quickstart

Initialize local copy:

```bash
npm i
npx playwright install --with-deps chromium
```

Download, extract and compile AsciiDoc source files of the Vert.x documentation:

```bash
npm run update-docs -- --latest-bugfix-versions-only
```

Start the website in development mode:

```bash
npm run dev
```

Export a static website:

```bash
npm run build
```

The website will be exported the `out` directory.

Test the exported website:

```bash
cd out
npx serve
```

## Developing inside a Dev Container

For convenience, we provide a [Dev Container](https://containers.dev/)
configuration file that allows you to run a complete development environment
inside a container. We recommend [Visual Studio Code](https://code.visualstudio.com/)
with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

You have to options to create the development environment:

*Option 1:* Clone the website repository to your local hard drive and open the
folder in Visual Studio Code. If you have the
[Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) 
installed, just follow the instructions on the screen.

*Option 2:* Use the command "Dev Containers: Clone Repository in Container
Volume" in Visual Studio Code. Everything will be set up automatically for you.

Container initialization may take several minutes. After that, you can start
developing. Use Visual Studio Code's built-in terminal to execute the following
commands.

Start the website in development mode:

```bash
npm run dev
```

Export a static website:

```bash
npm run build
```

## Docker

Build a Docker image that runs the static website inside NGINX:

```bash
docker build -t vertx-web-site .
docker run -it -p 80:80 vertx-web-site
```

Note: if you're on a Mac with Apple Silicon and configured Docker to use arm64,
you might have to add the `--platform` parameter during build:

```bash
docker build -t vertx-web-site . --platform=linux/amd64
```

## Automatic generation of the list of contributors

The community page contains a list of people who have contributed to any of the
Vert.x repositories. Generating this list takes some time and requires you to
authenticate against the GitHub API. Due to this, it is disabled by default.

If you want to generate the list of contributors, first create a
[personal access token](https://github.com/settings/tokens). Then, set the
environment variable `GITHUB_ACCESS_TOKEN`. For example:

```bash
GITHUB_ACCESS_TOKEN=abcdefghijklmnopqrs0123456789 npm run build
```

## Automated deployment

The [Deploy Workflow](https://github.com/vertx-web-site/vertx-web-site.github.io/actions/workflows/deploy.yml)
runs every time a new commit is pushed. It publishes the website to
https://vertx.io/. The workflow also runs once per night to update the how-tos,
guides, and the list of contributors.
