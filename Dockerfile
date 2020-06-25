FROM node:12-alpine as builder

WORKDIR /app

COPY ./package.json ./package.json

RUN npm install

COPY ./ ./

ARG BUILD_TARGET

RUN set -xe && \
          if [[ -n "$BUILD_TARGET" ]]; \
          then \
            npm run build:$BUILD_TARGET; \
          else \
            npm run build:dev; \
          fi


FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

RUN rm -f /usr/share/nginx/html/*.html /etc/nginx/nginx.conf

COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build/ ./
