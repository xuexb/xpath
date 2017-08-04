/**
 * @file xpath路径处理工具 - 测试
 * @author xuexb <fe.xiaowu@gmail.com>
 */

/* global getXpath, parseXpath */

/* eslint-disable max-nested-callbacks */

var $elem = null;

function createElement(str) {
    $elem = $(str).appendTo('body');

    return $elem;
}

afterEach(function () {
    if ($elem) {
        $elem.remove();
        $elem = null;
    }

});

describe('getXpath', function () {
    it('param is empty', function () {
        expect(function () {
            getXpath();
        }).to.throw('element不可为空');
        expect(function () {
            getXpath(null);
        }).to.throw('element不可为空');
    });

    it('param is error', function () {
        expect(function () {
            getXpath($('html').get(0));
        }).to.throw('element必须为body下面元素');

        expect(function () {
            getXpath(window);
        }).to.throw('element必须为body下面元素');
    });

    it('param context', function () {
        createElement([
            '<div></div>',
            '<div>',
            '   <div class="context">',
            '       <div></div>',
            '       <div class="child"></div>',
            '   </div>',
            '</div>'
        ].join(''));
        expect(getXpath($('.child').get(0), $('.context').get(0))).to.equal('div[2]');
        expect(getXpath($('.context').get(0), $('.context').get(0))).to.equal('');
    });

    describe('nodeList', function () {
        it('list div of 3', function () {
            createElement('<div>1</div><div>2</div><div>3</div>');

            expect(function () {
                getXpath($('div'));
            }).to.throw('element必须为单个节点');
            expect($('div').length).to.equal(3);
        });

        it('list p of 1', function () {
            createElement('<p>1</p>');

            expect(function () {
                getXpath($('p'));
            }).to.throw('element必须为单个节点');
            expect($('p').length).to.equal(1);
        });

        it('p of 1', function () {
            createElement('<p>1</p>');

            expect(function () {
                getXpath($('p').get(0));
            }).to.not.throw('element必须为单个节点');
            expect($('p').length).to.equal(1);
        });
    });

    it('node.id', function () {
        createElement([
            '<div id="xuexb">',
            '   <div>',
            '       <div></div>',
            '       <div></div>',
            '   </div>',
            '</div>'
        ].join(''));

        expect(getXpath($('#xuexb').get(0))).to.equal('//*[@id="xuexb"]');
        expect(getXpath($('#xuexb > div').get(0))).to.equal('//*[@id="xuexb"]/div');
        expect(getXpath($('#xuexb > div > div').get(0))).to.equal('//*[@id="xuexb"]/div/div[1]');
    });

    it('document.body', function () {
        expect(getXpath($('body').get(0))).to.equal('/html/body');
    });

    it('sibling elements', function () {
        createElement([
            '<!-- 我是注释 -->',
            '<!-- 我是注释 -->',
            '<a href="#">我是a标签</a>',
            '<!-- 我是注释 -->',
            '<div>div</div>',
            '<a href="#">我是a标签</a>',
            '<div>div</div>',
            '<div>',
            '   <div id="context">',
            '       <div></div>',
            '       <div class="child"></div>',
            '   </div>',
            '</div>'
        ].join(''));
        expect(getXpath($('div').get(0))).to.equal('/html/body/div[1]');
        expect(getXpath($('a').get(1))).to.equal('/html/body/a[2]');
        expect(getXpath($('.child').get(0))).to.equal('//*[@id="context"]/div[2]');
    });

    it('sibling index', function () {
        createElement([
            '<a href="#">我是a标签</a>',
            '<a href="#">我是a标签</a>',
            '<div>',
            '   <div id="context">',
            '       <div></div>',
            '       <div class="child"></div>',
            '   </div>',
            '</div>'
        ].join(''));
        expect(getXpath($('div').get(0))).to.equal('/html/body/div');
        expect(getXpath($('a').get(1))).to.equal('/html/body/a[2]');
        expect(getXpath($('.child').get(0))).to.equal('//*[@id="context"]/div[2]');
    });
});

describe('parseXpath', function () {
    it('param is empty', function () {
        expect(function () {
            parseXpath();
        }).to.throw('query不可为空');
        expect(function () {
            parseXpath(null);
        }).to.throw('query不可为空');
    });

    it('param is error', function () {
        expect(function () {
            parseXpath([]);
        }).to.throw(/INVALID_EXPRESSION_ERR/);

        expect(function () {
            parseXpath('fsdf@fdsfsd');
        }).to.throw(/INVALID_EXPRESSION_ERR/);
    });

    it('node.id', function () {
        createElement([
            '<div id="xuexb">',
            '   <div>',
            '       <div></div>',
            '       <div></div>',
            '   </div>',
            '</div>'
        ].join(''));

        expect(parseXpath('//*[@id="xuexb"]')).to.deep.equal($('#xuexb').get(0));
        expect(parseXpath('//*[@id="xuexb"]/div/div[2]')).to.deep.equal($('#xuexb > div > div').get(1));
    });

    it('param context', function () {
        createElement([
            '<div></div>',
            '<div>',
            '   <div class="context">',
            '       <div></div>',
            '       <div class="child"></div>',
            '   </div>',
            '</div>'
        ].join(''));
        expect(parseXpath('div[2]', $('.context').get(0))).to.deep.equal($('.child', '.context').get(0));
    });
});

describe('getXpath <-> parseXpath', function () {
    it('getXpath -> parseXpath', function () {
        createElement([
            '<div>',
            '   <div>',
            '       <div></div>',
            '       <div class="child"></div>',
            '   </div>',
            '</div>',
            '<div id="xuexb">',
            '   <div>',
            '       <div></div>',
            '       <div></div>',
            '   </div>',
            '</div>'
        ].join(''));

        var elem = $('#xuexb > div > div').get(1);
        var elem2 = $('.child').get(0);

        expect(parseXpath(getXpath(elem))).to.deep.equal(elem);
        expect(parseXpath(getXpath(elem2))).to.deep.equal(elem2);
    });

    it('parseXpath -> getXpath', function () {
        createElement([
            '<div>',
            '   <div>',
            '       <div></div>',
            '       <div class="child"></div>',
            '   </div>',
            '</div>',
            '<div id="xuexb">',
            '   <div>',
            '       <div></div>',
            '       <div></div>',
            '   </div>',
            '</div>'
        ].join(''));

        var xpath1 = '//*[@id="xuexb"]/div/div[2]';
        var xpath2 = '/html/body/div[1]/div/div[2]';

        expect(getXpath(parseXpath(xpath1))).to.equal(xpath1);
        expect(getXpath(parseXpath(xpath2))).to.equal(xpath2);
    });
});

/* eslint-enable max-nested-callbacks */
