### 开发须知

node server.js 启动bff 层
node backend 启动后端服务

- 在bff层返回的body中，已经通过
>  <script src="./static/main.js"></script>
覆盖前端代码

这个时候前端可操作的

- 数据共享
  在node返回的前端页面中，把几个初始化的变量挂在window上，浏览器页面可以直接同步

