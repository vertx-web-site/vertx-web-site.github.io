# Vert.x Website

This repository contains the source of the Vert.x website (https://vertx.io).

## Quickstart

Initialize local copy:

    npm i

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

    rm -rf node_modules
    docker run -it -v $(pwd):/vertx node:12-slim sh -c "cd /vertx && npm i"
    docker run -it -v $(pwd):/vertx -p 3000:3000 node:12-slim \
      sh -c "cd /vertx && npm run dev"

Alternatively, build a Docker image that runs the static website inside NGINX
(no hot reloading!):

    docker build -t vertx-web-site .
    docker run -it -p 80:80 vertx-web-site
