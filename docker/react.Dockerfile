#FROM node:14

#WORKDIR /app

#COPY ./frontend /app

#RUN yarn install

#RUN yarn build

#RUN yarn global add serve

#CMD ["serve", "-p", "3000", "-s", "./build/"]

FROM node:16.8-alpine3.11 as build-deps
WORKDIR /app
COPY ./frontend /app
RUN sed -i -e 's/http:/https:/' /etc/apk/repositories
RUN apk update \
    && apk add --no-cache git \
    && yarn install \
    && yarn build

FROM nginx
COPY --from=build-deps /app/build /var/www/html/
COPY ./frontend/nginx.conf /etc/nginx/nginx.conf

