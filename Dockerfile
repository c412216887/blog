FROM nginx:latest

COPY conf.d/nginx.conf /etc/nginx/conf/default.conf

EXPOSE 80
