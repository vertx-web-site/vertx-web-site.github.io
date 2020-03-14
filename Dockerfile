FROM node:12-slim AS build

RUN mkdir /vertx
COPY package.json package-lock.json /vertx/

WORKDIR /vertx
RUN npm i

COPY . /vertx/
RUN npm run build

FROM nginx:latest

COPY --from=build /vertx/out /usr/share/nginx/html
