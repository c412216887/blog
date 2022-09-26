# network
## OSI参考模型和TCP五层模型

 |OSI参考模型|TCP/IP 五层模型| 实例|
 |---|---|---|
 |应用层|应用层| http|
 |表示层|||
 |会话层|||
 |传输层|传输层|tcp/udp|
 |网络层|网络层|ip|
 |数据链路层|数据链路层|
 |物理层|物理层|

## http/1.1
### 请求报文
> SP 表示一个空格； CRLF： 表示\r\n, 报文不管是window还是ios都是CRLF换行

Method SP path SP version CRLF   
headers CRLF     
CRLF    
message   

### 响应报文
>  SP 表示一个空格； CRLF： 表示\r\n, 报文不管是window还是ios都是CRLF换行

version SP status SP status-desc CRLF    
headers CRLF     
CRLF   
message    


## 状态码
- 200 success 成功
- 201 created 已创建, 创建一个新的文件
- 204 no content 请求已经成功处理，但是无返回内容
- 206 partial content 部分内容,进行分片下载时，使用
- 401 Unauthorized 用户没有验证通过，重新登录
- 403 Forbidden 用户没有验证通过，禁止后续操作
- 404 Not found 没有找到相关资源
- 500 Internal Server Error 服务器错误
- 503 Server Unavailable 服务器不可用，一般出现在工程正在部署阶段
