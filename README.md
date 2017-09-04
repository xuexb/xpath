# [xpath路径查看工具](//xuexb.github.io/xpath/index.html)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1d59cec10d1b4cada49b434a509f2a0d)](https://www.codacy.com/app/xuexb/xpath?utm_source=github.com&utm_medium=referral&utm_content=xuexb/xpath&utm_campaign=badger)
[![code style fecs](https://img.shields.io/badge/code%20style-fecs-brightgreen.svg)](https://github.com/ecomfe/fecs)
[![Build Status](https://img.shields.io/travis/xuexb/xpath/master.svg)](https://travis-ci.org/xuexb/xpath)
[![Test Coverage](https://img.shields.io/coveralls/xuexb/xpath/master.svg)](https://coveralls.io/r/xuexb/xpath?branch=master)

[![Saucelabs Build Status](https://saucelabs.com/browser-matrix/apijs.svg)](https://saucelabs.com/beta/builds/6668736dc1464329a8913d33385318c5)

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