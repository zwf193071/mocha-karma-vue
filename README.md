# mocha-karma-vue

## 基于现有的项目插入mocha测试
1. 在build文件夹下新建`webpack.test.conf.js`文件
2. 新增tests目录
3. `App.vue`引入static/css会导致报错，注意在`webpack.test.conf.js里配置null-loader

