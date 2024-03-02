---
date: '2019-02-25 07:36:01'
author: lzw
---

# 如何禁用http的delete put trace 方法

1、Apache在httpd.conf添加如下配置：

```js
<Location "/">
   AllowMethods GET POST
</Location>
```

参考：[https://httpd.apache.org/docs/2.4/mod/mod_allowmethods.html](https://httpd.apache.org/docs/2.4/mod/mod_allowmethods.html)

2、Nginx在nginx.conf中进行如下设置

```js
if ($request_method !~ ^(GET|HEAD|POST)$ ) {
   return 403;
}
```
