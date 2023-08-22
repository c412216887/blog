# TCP

## 参考资料

- [理清 HTTP 之下的 TCP 流程，让你的 HTTP 水平更上一层](https://mp.weixin.qq.com/s?__biz=Mzg3OTYzMDkzMg==&mid=2247490065&idx=1&sn=9c16736d1b22e5f8965b40ce8ab6759b&chksm=cf00d52af8775c3c0d3a6c0ef531c43a9fe717d6562a27b5a43cb6ac3449bbc71f2db9dd958c&scene=178&cur_album_id=2213980675857350658#rd)

## 简介

![TCP数据结构](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGhkiczVH5B7ViabSmY4l3WnWNwFRTguMGicVWYbmiaEyqMajaEDZHFmWm9LY8nbr7drLM0buYRyRwTARw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- TCP 是端口到端口的协议，最开始是源端口和目标端口
- 接下来是序列号(sequence number),表示当前包的序列号。
- 接下来是确认的序列号(acknowledgment number),表示收到序列号 XXX(ack number - 1)的包
- flag 标识位
  - SYN：请求建立一个连接(说明这是链接接开始)
  - ACK：表示 ack number 是否有效
  - FIN：表示本端要断开链接了(说明这是链接结束)
