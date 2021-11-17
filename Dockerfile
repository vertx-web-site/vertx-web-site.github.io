FROM node:16-slim AS build

RUN mkdir -p /vertx/docs
COPY package.json package-lock.json /vertx/
COPY docs/package.json docs/package-lock.json /vertx/docs

WORKDIR /vertx
RUN npm i

COPY docs /vertx/docs/
RUN npm run update-docs

COPY . /vertx/
RUN npm run build

# Setup NGINX
FROM nginx:latest

COPY --from=build /vertx/out /usr/share/nginx/html
