FROM nginx:latest

COPY ./docs/.vitepress/dist/ /usr/share/nginx/html

COPY ./conf.d/nginx.conf /etc/nginx/conf/default.conf

EXPOSE 80
