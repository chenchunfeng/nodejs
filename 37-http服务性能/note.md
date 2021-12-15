**服务性能**
```text
Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        240949 bytes

Concurrency Level:      100
Time taken for tests:   0.392 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      24108800 bytes
HTML transferred:       24094900 bytes
Requests per second:    255.13 [#/sec] (mean) // qps 每秒请求数
Time per request:       391.953 [ms] (mean)  // 每个平均请求时间
Time per request:       3.920 [ms] (mean, across all concurrent requests) // 下一个并发请求的间隔时间
Transfer rate:          60067.79 [Kbytes/sec] received  // 吞吐量

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.2      0       1
Processing:    16  290  99.7    344     378
Waiting:        6  215 102.0    232     377
Total:         16  290  99.6    344     378
```

**常用参数**
-n 总的请求数
-c 最大并发数
-t 测试所进行的最大秒数。其内部隐含值是-n 50000，
-H 指定header，如token，多个header就写多个-H
-T 指定content-type，如：application/json
-p 指定POST要发送的body，必须是本地的一个文件路径，指定了-p参数那么请求类型自动就是POST
-A 指定Authorization，如-A 'today:nie'

- 普通GET请求，
```text
ab -c 10 -n 100 http://xxx.com/   并发度10，一共100个请求
ab -c 10 -t 100 http://xxx.com/    并发度10，请求100s
```
- 发送x-www-form-urlencoded POST请求
```text
// post.txt的内容
cat post.txt
a=1&b=2

ab -n 100 -c 10 -p post.txt -T 'application/x-www-form-urlencoded' http://xxx.com/
```
- 携带token
```text
ab -n 10 -c 1 -H 'token: abc'  http://xxx.com/
// 多个header
ab -n 10 -c 1 -H 'token: abc' -H 'version: v1'  http://xxx.com/
```

并发量定义，一般是用户数的80%

node.js 排除硬件问题的话，一般就是要优化js脚本

网卡，可对比网卡 带宽 吞吐率
CPU 内存 可在压测时 观察linux top
硬盘 linux iostat