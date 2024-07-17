FROM node:20-slim AS build

RUN mkdir -p /vertx/docs
COPY package.json package-lock.json /vertx/
COPY docs/package.json docs/package-lock.json /vertx/docs

WORKDIR /vertx
RUN npm ci

# Chromium is required to generate OpenGraph images
RUN npx playwright install --with-deps chromium

COPY docs /vertx/docs/
RUN npm run update-docs

COPY . /vertx/
RUN npm run build

# Setup NGINX
FROM nginx:latest

COPY --from=build /vertx/out /usr/share/nginx/html
