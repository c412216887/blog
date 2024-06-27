# docker

docker 是一个应用打包、分发、部署的工具
**打包**： 就是将应用运行所需要的依赖、第三方库、软件打包在一起  
**分发**： 可以将打包好的"镜像"上传到一个镜像仓库
**部署**：拿着"镜像"就可以一个命令运行应用，自动模拟出一模一样的运行环境

## docker 基础概念

镜像(image):  
 运行 `docker run XXX` 会自动生成一个容器  
 进入交互终端 `docker run -it XXX`

容器(container):  
 启动 `docker start XXX`  
 进入交互终端 `docker start -i xxx`  
 停止 `docker stop XXX`  
 杀掉 `docker kill XXX`  
 删除 `docker rm XXX`  
:::
`docker kill` 和 `docker stop`有什么区别？

:::

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
