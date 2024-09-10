FROM node:20-slim AS build

RUN mkdir -p /vertx/docs & mkdir -p /vertx/scraper
COPY package.json package-lock.json /vertx/
COPY docs/package.json docs/package-lock.json /vertx/docs
COPY scraper/package.json scraper/package-lock.json /vertx/scraper

WORKDIR /vertx
RUN npm ci

# Chromium is required to generate OpenGraph images
RUN npx playwright install --with-deps chromium

COPY docs /vertx/docs/
COPY tsconfig.json /vertx
COPY components/lib/steep-color-theme.json /vertx/components/lib/steep-color-theme.json
RUN npm run update-docs

COPY . /vertx/
RUN npm run build

# Setup NGINX
FROM nginx:latest

COPY --from=build /vertx/out /usr/share/nginx/html
