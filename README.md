# [xpath路径工具](//xuexb.github.io/xpath/index.html)

- 生成元素对应的xpath路径
- 根据xpath路径获取对应的元素

[![code style fecs](https://img.shields.io/badge/code%20style-fecs-brightgreen.svg)](https://github.com/ecomfe/fecs)
[![Build Status](https://img.shields.io/travis/xuexb/xpath/master.svg)](https://travis-ci.org/xuexb/xpath)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1d59cec10d1b4cada49b434a509f2a0d)](https://www.codacy.com/app/xuexb/xpath?utm_source=github.com&utm_medium=referral&utm_content=xuexb/xpath&utm_campaign=badger)
[![Test Coverage](https://img.shields.io/coveralls/xuexb/xpath/master.svg)](https://coveralls.io/r/xuexb/xpath?branch=master)

## api

### getXpath
```js
/**
 * 获取元素xpath路径
 *
 * @param  {HTMLElement} element 元素
 * @param  {HTMLElement} [context=document.body] 父节点
 *
 * @return {string}
 */
function getXpath(element, context) {}
```


### parseXpath

```js
/**
 * 解析xpath路径为dom元素
 *
 * @param  {string} query   xpath路径
 * @param  {HTMLElement} [context=document.body] 父节点
 *
 * @return {HTMLElement}
 */
function parseXpath(query, context) {}
```

## License

[Apache 2.0](./LICENSE)
