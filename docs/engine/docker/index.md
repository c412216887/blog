# docker

docker 是一个应用打包、分发、部署的工具  
**打包**：就是将应用运行所需要的依赖、第三方库、软件打包在一起  
**分发**：可以将打包好的"镜像"上传到一个镜像仓库  
**部署**：拿着"镜像"就可以一个命令运行应用，自动模拟出一模一样的运行环境

## docker 基础概念

- 镜像(image):  
  `docker search [镜像名称]` 搜索 docker 镜像,只能查到镜像名，无法查询到 tag，需要到 hub.docker.com 上面去查询具体的 tag  
  `docker images` 查看本地所有镜像  
  `docker run [镜像名称/镜像id]` 运行镜像会自动生成一个容器  
  `docker run -it [镜像名称/镜像id] bash` 运行镜像并且打开终端 bash, `bash`是创建容器后，执行的 CMD，同时会覆盖`Dockerfile`中的`CMD`  
  `docker run --rm [镜像名称/镜像id]` 容器关闭后自动删除容器  
  `docker rmi [镜像名称/镜像id]` 删除镜像

- 容器(container):  
   `docker start [容器ID/容器名]` 启动一个容器  
   `docker start -i [容器ID/容器名]` 启动容器，进入交互终端  
   `docker stop [容器ID/容器名]` 停止容器  
   `docker kill [容器ID/容器名称]` 杀掉容器  
   `docker rm [容器ID/容器名称]` 删除容器  
  :::info  
  `docker kill` 和 `docker stop`有什么区别？
  :::

- 日志(logs)  
  `docker logs [容器ID]` 查看容器日志
- Dockerfile  
  `docker build -t [镜像名称:镜像标识] .` 有一个`.`,在当前文件夹中寻找`dockerfile`文件构建镜像，`-t`给镜像取个标记
  - 指令详解
    |指令|说明|
    |--|--|
    |FROM|指定基础镜像,一个 dockerfile 中，只能有一个`FROM`,后面的 `FROM` 会覆盖前面的 `FROM` |
    |<del>MAINTAINER</del>|已弃用，使用`label author=[名称]`代替。维护者，指定 `Dockerfile` 维护者|
    |ENV|当前 dockerfile 的环境变量,后续使用`$[变量名]`调用|  
    |WOEKDIR|工作目录, 终端打开指定的位置|
    |COPY|将本地文件/目录复制到 docker 中|
    |ADD|将本地文件/目录添加到 docker 中，会自动解压 tar、zip 等压缩文件|
    |RUN|在`docker build`过程中执行|
    |CMD|一个 Dockerfile 只能有一个`CMD`,如果有多个，则只有最后一个`CMD`指令会生效,在`docker run`创建容器|
    |ENTRYPOINT|定义一个可执行的程序或脚本，然后再容器启动时运行这个程序|
- docker-compress

## `docker run`

1.运行本地镜像， 2.如果本地找不到镜像，会去网上下载镜像

```shell
# 运行镜像
> docker run hello-world
# 输出
Unable to find image 'hello-world:latest' locally # 先查找本地是否存在镜像
latest: Pulling from library/hello-world # 从网络上拉取相关镜像
2db29710123e: Pull complete
Digest: sha256:2498fce14358aa50ead0cc6c19990fc6ff866ce72aeb5546e1d59caac3d0d60f
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
```
