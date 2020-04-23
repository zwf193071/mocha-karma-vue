import Vue from 'vue';

Vue.config.productionTip = false;

// 测试所有以 .spec.js 名称结尾的文件
// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);
