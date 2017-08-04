/**
 * @file xpath路径处理工具
 * @author xuexb <fe.xiaowu@gmail.com>
 */

/* eslint-disable no-unused-vars */

/**
 * 获取元素xpath路径
 *
 * @param  {htmlElement} element 元素
 * @param  {htmlElement} [context=document.body] 父节点
 *
 * @return {string}
 */
function getXpath(element, context) {
    if (!element) {
        throw new TypeError('element cannot be empty');
    }
    else if (element === window || element === document.documentElement) {
        throw new TypeError('element should be a descendent of body');
    }
    else if (typeof element.length === 'number') {
        throw new TypeError('element should be a single node');
    }

    if (element.id !== '') {
        return '//*[@id="' + element.id + '"]';
    }

    else if (element === document.body) {
        return '/html/body';
    }

    else if (element === context) {
        return '';
    }

    var index = 1;
    var str = '';

    [].slice.call(element.parentNode.childNodes).forEach(function (sibling) {
        if (sibling === element) {
            str = getXpath(element.parentNode, context);

            // 需要连接符
            if (str) {
                str += '/';
            }

            str += element.tagName.toLowerCase() + '[' + (index) + ']';
        }
        else if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
            index += 1;
        }
    });


    // 如果同级节点只有一个标签, 则去掉索引
    if (index === 1 && str) {
        str = str.substr(0, str.length - 3);
    }

    return str;
}

/**
 * 解析xpath路径为dom元素
 *
 * @param  {string} query   xpath路径
 * @param  {htmlElement} [context=document.body] 父节点
 *
 * @return {htmlElement}
 */
function parseXpath(query, context) {
    if (!query) {
        throw new TypeError('query cannot be empty');
    }

    return document.evaluate(
        query,
        context || document.body,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    ).snapshotItem(0);
}

/* eslint-enable no-unused-vars */
