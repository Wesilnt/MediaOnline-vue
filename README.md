## Project setup
```
npm install
```

### 开发模式
```
npm run serve
```

### 文档地址

   [App 接口文档访问地址]( https://xcx.test.shbaoyuantech.com:30000/swagger-ui.html)
   
   [Web 后台接口文档访问地址]( http://adminxcx.test.shbaoyuantech.com:30008/swagger-ui.html)

   [App 原型文档访问地址]( http://192.168.1.176:8080/prototype/app )

   [Web 后台原型文档访问地址]( http://192.168.1.176:8080/prototype/web )

   [UI 设计文档访问地址]( ... )




[UI 库 mint-ui](https://mint-ui.github.io/docs/#/zh-cn2/)
```
Icon地址 
https://material.io/tools/icons/?icon=assignment_returned&style=baseline

```

[数据使用Vuex](https://vuex.vuejs.org/zh/)
```
data 管理约定：
    数据管理用 Vuex
    状态管理 使用组件局部data 如显隐
```

[路由使用Router](https://router.vuejs.org/zh/)

[vuejs-devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

### 打包上线（jenkins托管）
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### 添加目录结构
    1. views/freezone   免费专区 
    2. views/readings   读书会
       readings/BookDetail.vue  读书会-书详情
       readings/BookSummary.vue    读书会-书简介