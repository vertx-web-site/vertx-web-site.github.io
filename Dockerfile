# Download and extract docs
FROM openjdk:11-jdk-slim AS docs

RUN mkdir /vertx
COPY docs/ /vertx/docs/

WORKDIR /vertx/docs
RUN ./gradlew

# Build website
FROM node:16-slim AS build

RUN mkdir /vertx
COPY package.json package-lock.json /vertx/

WORKDIR /vertx
RUN npm i

COPY . /vertx/
COPY --from=docs /vertx/docs/extracted/ /vertx/docs/extracted/
COPY --from=docs /vertx/public/docs/ /vertx/public/docs/
RUN npm run build

# Setup NGINX
FROM nginx:latest

COPY --from=build /vertx/out /usr/share/nginx/html
