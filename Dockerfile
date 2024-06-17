FROM node:22-alpine as bundler

WORKDIR /tmp/app

COPY client/ /tmp/app

RUN npm ci && npm run build

FROM golang:1.22 as builder

WORKDIR /tmp/app

COPY api/ /tmp/app

RUN go mod download && go build -o /tmp/app/dist/api

FROM debian:stable-slim
LABEL authors="yaon"

WORKDIR /root

RUN apt update &&\
    apt install -y glusterfs-server golang nginx

COPY --from=bundler /tmp/app/dist /var/www/html
COPY --from=builder /tmp/app/dist/api /usr/local/bin/api

COPY docker/etc/nginx/sites-available/glusterfs_webui /etc/nginx/sites-available/glusterfs_webui
RUN ln -s /etc/nginx/sites-available/glusterfs_webui /etc/nginx/sites-enabled/glusterfs_webui

RUN echo "#!/bin/sh" > start.sh &&\
    echo "glusterd -N &" >> start.sh &&\
    echo "nginx -g 'daemon off;' &" >> start.sh &&\
    echo "/usr/local/bin/api >> /var/log/glusterfs_webui.log 2>&1 &" >> start.sh &&\
    echo "tail -f /var/log/nginx/access.log >> /var/log/glusterfs_webui.log 2>&1 &" >> start.sh &&\
    echo "tail -f /var/log/glusterfs_webui.log" >> start.sh &&\
    chmod +x start.sh

EXPOSE 8080 8081

ENTRYPOINT ["sh", "start.sh"]