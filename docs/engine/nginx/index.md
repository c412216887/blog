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
nginx.conf 主配置文件地址： /etc/nginx/conf.d/
其他配置文件地址： etc/nginx/conf.d/

## 注意事项

在 linux 中，nginx 其他配置文件，只能增加 server 配置  
:::info
在 linux 中， nginx 得主要配置文件，在`etc/nginx/nginx.conf`中
:::

```
# nginx.conf
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;
    # 这里面存放server模块
    include /etc/nginx/conf.d/*.conf;
}
```

## 负载均衡配置

负载均衡的配置主要是在 http 模块中

```
http {
  upstream [取一个服务器名称] {
    server [服务器地址] [权重];
    server 192.168.0.123:8080 weight=100;
    server 192.168.0.123:8081 weight=200;
  }
  server {
    listen 80;
    location / {
      proxy_pass http://[负载均衡配置时设置的服务器名称]
    }
  }
}
```

## location 路由匹配规则

```
location ~.*\.(html/css/js/png)
```

- `~` 匹配大小写
- `.`匹配任意字符
- `*`出现 0 到无数次
- `\.`转义，匹配`.`
- `(html|...|js)`代表匹配括号里面任一后缀

## nginx 资源压缩

nginx 提供三个支持资源压缩的模块

- nginx_http_gzip_module 内置模块，可以直接使用
- nginx_http_gzip_static_module
- nginx_http_gunzip_module

### nginx_http_gzip_module

| 参数项            | 释义                                    | 参数值                 |
| ----------------- | --------------------------------------- | ---------------------- |
| gzip              | 开启或关闭压缩机制                      | on/off                 |
| gzip_types        | 根据文件类型选择性开启压缩机制          | image/png、text/css    |
| gzip_comp_level   | 设置压缩级别，级别越高越耗时            | 1~9(越高压缩效果越好)  |
| gzip_vary         | 设置响应头是否携带 Vary:Accept-Encoding | on/off                 |
| gzip_buffers      | 设置处理压缩请求的缓存区数量和大小      | 数量大小，如 16 8k     |
| gzip_disable      | 针对不同客户端的请求来设置是否开始压缩  | \*Chrome\*             |
| gzip_http_version | 指定压缩响应所需要的最低 http 请求版本  | 1.1                    |
| gzip_min_length   | 设置触发压缩的文件最低大小              | 512k                   |
| gzip_proxied      | 对于后端服务器的响应结果是否开启压缩    | off、expired、no-cache |

:::info
响应头 Vary

- Vary 字面意思时"不一、多样性"
- Vary 作为响应头，由服务器端返回数据时添加的头部信息
- Vary 的内容来自当前请求 Request 头的 key，比如 Accept-Encoding、User-Agent 等
- 缓存服务器对某接口的网络请求结果进行数据缓存时，会将 Vary 一起缓存
  :::

```
# http模块
http {
  # 开启压缩机制
  gzip_static on;
  gzip on;
  # 指定会被压缩的文件类型
  gzip_types text/plain application/javascript text/css application/xml text/javascript image/jpeg image/png image/gif;
  # 设置压缩级别，越高资源消耗越大，但压缩效果越好
  gzip_comp_level 5;
  # 在响应头中添加Vary: Accept-Encoding (建议开启)
  gzip_vary on;
  # 处理压缩请求的缓冲区数量和大小
  gzip_buffers 16 8k;
  # 对于不支持压缩功能的客户端请求不开启压缩机制
  gzip_disable "MSIE [1-6]\."; # 低版本的IE浏览器不支持压缩
  # 设置压缩响应所支持的http最低版本
  gzip_http_version 1.1;
  # 设置触发压缩的最小阈值
  gzip_min_length 2k;
  # 关闭对后端服务器的响应结果进行压缩
  gzip_proxied off;
}
```

:::warning
想要开启 gzip 压缩，尽可能所有的配置项都配置齐全，至少要配置`gzip`、`gzip_typs`
:::

## nginx 缓冲区

客户端 -> nginx, nginx-> 服务器，两者之间可能存在网速得差异，nginx 使用缓冲区来缓解网速差异带来的极差的体验感。相当于，在 cpu 和硬盘之间，增加一道内存卡，进行过渡缓存。

## nginx 缓存

提升性能，利用缓存：

- 减少了再次向后端或者文件服务器请求资源的带宽消耗
- 降低了下游服务器的访问压力，提升系统整体吞吐
- 缩短响应时间，提升加载速度，打开页面的速度更快

## nginx 黑白名单

`Nginx`做黑白名单机制，主要是通过`allow、deny`配置项来实现

```
allow xxx.xxx.xxx; # 允许指定的IP访问，可以用于实现白名单
deny xxx.xxx.xxx; # 禁止指定的IP访问，可以用于实现黑名单
```

当同时需要允许/禁止多个`IP`访问时，如果所有`IP`全部写在`nginx.conf`文件中，会显得臃肿。可以新建两个文件` BlackIP.conf``WhiteIP.conf `

```
# BlackIP.conf
deny 192.177.12.222; # 屏蔽
```
