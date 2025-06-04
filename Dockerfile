FROM node:22.13.0 as node

WORKDIR /app
COPY package*.json /app/
COPY ./ /app/

RUN yarn
RUN yarn run build

FROM nginx:1.14.2-alpine
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
