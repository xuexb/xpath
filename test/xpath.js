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
        }).to.throw('element cannot be empty');
        expect(function () {
            getXpath(null);
        }).to.throw('element cannot be empty');
    });

    it('param is error', function () {
        expect(function () {
            getXpath($('html').get(0));
        }).to.throw('element should be a descendent of body');

        expect(function () {
            getXpath(window);
        }).to.throw('element should be a descendent of body');
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
            }).to.throw('element should be a single node');
            expect($('div').length).to.equal(3);
        });

        it('list p of 1', function () {
            createElement('<p>1</p>');

            expect(function () {
                getXpath($('p'));
            }).to.throw('element should be a single node');
            expect($('p').length).to.equal(1);
        });

        it('p of 1', function () {
            createElement('<p>1</p>');

            expect(function () {
                getXpath($('p').get(0));
            }).to.not.throw('element should be a single node');
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
            '</div>',
            '<form>',
            '   <input type="button" value="test">',
            '   <input type="text">',
            '</form>',
            '<form>',
            '   <input type="button" value="test">',
            '   <input type="text">',
            '</form>'
        ].join(''));
        expect(getXpath($('form').get(0))).to.equal('/html/body/form[1]');
        expect(getXpath($('form input').get(0))).to.equal('/html/body/form[1]/input[1]');
        expect(getXpath($('div').get(0))).to.equal('/html/body/div');
        expect(getXpath($('a').get(1))).to.equal('/html/body/a[2]');
        expect(getXpath($('.child').get(0))).to.equal('//*[@id="context"]/div[2]');
    });
});

describe('parseXpath', function () {
    it('param is empty', function () {
        expect(function () {
            parseXpath();
        }).to.throw('query cannot be empty');
        expect(function () {
            parseXpath(null);
        }).to.throw('query cannot be empty');
    });

    it('param is error', function () {
        expect(function () {
            parseXpath([]);
        }).to.throw('query cannot be string');

        expect(function () {
            parseXpath({});
        }).to.throw('query cannot be string');

        expect(parseXpath('fsdf@fdsfsd')).to.equal(null);
        expect(parseXpath('div123')).to.equal(null);
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
