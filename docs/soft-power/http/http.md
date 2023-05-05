# HTTP

## http/1.1

### 请求报文

> SP 表示一个空格； CRLF： 表示\r\n, 报文不管是 window 还是 ios 都是 CRLF 换行

Method SP path SP version CRLF  
headers CRLF  
CRLF  
message

### 响应报文

> SP 表示一个空格； CRLF： 表示\r\n, 报文不管是 window 还是 ios 都是 CRLF 换行

version SP status SP status-desc CRLF  
headers CRLF  
CRLF  
message

## 状态码

- 200 success 成功
- 201 created 已创建，创建一个新的文件
- 204 no content 请求已经成功处理，但是无返回内容
- 206 partial content 部分内容,进行分片下载时，使用
- 301 Moved Permanently 请求资源永久移动，新的地址，在头部 location 中，浏览器自动跳转到新的地址。
- 302 Found 请求资源临时更改，新的地址，在头部 location 中，浏览器自动跳转到新的地址
- 304 Not Modified 协商缓存，使用
- 401 Unauthorized 用户没有验证通过，重新登录
- 403 Forbidden 用户没有验证通过，禁止后续操作
- 404 Not found 没有找到相关资源
- 500 Internal Server Error 服务器错误
- 503 Server Unavailable 服务器不可用，一般出现在工程正在部署阶段
