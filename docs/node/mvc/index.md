# MVC

## 架构模式
![架构模式](https://s0.lgstatic.com/i/image6/M00/17/08/CioPOWBHMl-ASR4aAAAg3opNISU640.png)

## 获取用户发帖的列表信息 API
 - RESTful API
  queryContentFromDB
  filterUserIds
  get
  addUserInfo
  setRetInfo
    返回两个状态码--0：成功； -1： 失败
 - api server
  queryUserInfoFromDB


## 处理请求
 1. 使用URL对请求进行转义处理
