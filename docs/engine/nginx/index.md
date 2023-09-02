# nginx

## 什么是 nginx

Nginx 是一个高性能的 HTTP 和反向代理 web 服务器

## nginx 作用

1. 反向代理
2. 负载均衡

## 正向代理和反向代理

正向代理：安装在客户端，拦截客户端上的各种 http 访问，然后代理到对应的服务器上，例如：vpn
反向代理：将 http 访问，分发到需要处理的服务器，例如：nginx

## 负载均衡

nginx 内置负载均衡策略为：轮询、加权轮询、ip hash

## nginx 配置文件

一共四大块

1. 全局配置
2. events 配置
3. http 配置
4. http 中的 server 配置

- 配置中每行必须用`;`结尾
- 配置中，属性与值之间用**空格**隔开，多个值之间也使用**空格**

## linux 中的 nginx

html 页面地址： /usr/share/nginx/html
nginx.conf 主配置文件地址： /etc/nginx/nginx.conf
其他配置文件地址： etc/nginx/conf.d/

## 注意事项

在 linux 中，nginx 其他配置文件，只能增加 server 配置
