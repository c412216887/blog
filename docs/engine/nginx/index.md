# nginx

## 简介

Nginx 是一款**轻量级**的**高性能**的 **web 服务器** 和 **反向代理服务器**

- 基于事件驱动架构，使其可以支持百万级别的 TCP 链接
- 高度的模块化、扩展性好、自由软件许可证(TIM)。社区模块层出不穷
- 跨平台服务器，可以在 linux、windows、Mac OS

## nginx 作用

1. 反向代理

- 正向代理：有明确的请求地址。安装在客户端，拦截客户端上的各种 http 访问，然后代理到对应的服务器上，例如：vpn
- 反向代理：将 http 访问，分发到需要处理的服务器，例如：nginx

2. 负载均衡

- 单个服务器解决不了，通过增加服务器数量，然后将请求分发到各个服务器
- nginx 内置负载均衡策略为：轮询、加权轮询、ip hash

## nginx 命令

```shell
# 启动
# 重启
nginx -s reload
# 关闭
nginx -s stop # 强制关闭
nginx -s quit # 平稳退出
# 日志
nginx -s reopen
# 测试配置文件
nginx -t -c conf/nginx.conf
```

## nginx 配置结构

一共四大块

1. 全局配置
2. events 配置
3. http 配置
4. http 中的 server 配置

main # 全局配置，对全局生效
|--- events # 配置影响 nginx 服务器或与用户的网络链接
|--- http # 配置代理，缓存，日志定义等绝大多数功能和第三方模块配置
| |--- upstream # 配置后端服务器具体地址，负载均衡配置
| |--- server # 配置虚拟主机的相关参数，一个 http 模块可以包含多个 server 模块
| |--- server
| | |--- location # 配置请求以及各个页面的处理情况，一个 server 块可以包含多个 location 模块
| | |--- location

- 配置中每行必须用`;`结尾
- 配置中，属性与值之间用**空格**隔开，多个值之间也使用**空格**

```conf
worker_processes 1; # worker进程的数量
events { # 事件区块
  worker_connections 1024; # 每个worker进程支持的最大的链接数
}
http { # http区块
  include nime.types; # Nginx支持的媒体类型库文件
  default_type application/octet-stream; # 默认的媒体类型
  sendfile on; # 开启高效传输模式
  keepalive_timeout 65; # 链接超时
  server { # 第一个server区块, 表示一个独立的虚拟主机站点
    listen 80; # 监听端口
    server_name localhost; # 提供服务的域名主机名
    location / { # location区块
      root html; # 站点的根目录，相当于Ngnix的安装目录下面html文件夹
      index index.html index.htm; # 默认的首页文件，多个用空格分开
    }
    error_page 500 502 503 504 /50x.html; # 出现对应的http状态码，使用50x.html
    location = /50x.html {
      root html; # 指定对应的站点目录为html
    }
  }
}
```

## linux 中的 nginx

html 页面地址： /usr/share/nginx/html
nginx.conf 主配置文件地址： /etc/nginx/conf/
其他配置文件地址： etc/nginx/conf.d/

## 注意事项

在 linux 中，nginx 其他配置文件，只能增加 server 配置
