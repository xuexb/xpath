/**
 * @file karma配置
 * @author fe.xiaowu@gmail.com
 */

const base = require('./karma.conf.base.js');

const customLaunchers = {
    // Safari
    // sl_ios_safari: {
    //     base: 'BrowserStack',
    //     browser: 'safari',
    //     os: 'ios',
    //     os_version: null
    // },

    bs_iphone5: {
        base: 'BrowserStack',
        device: 'iPhone 5',
        os: 'ios',
        os_version: '6.0'
    },


    // 安卓浏览器
    // sl_android_4_4: {
    //     base: 'BrowserStack',
    //     os: 'android',
    //     os_version: '4.4'
    // },
    // sl_android_5: {
    //     base: 'BrowserStack',
    //     os: 'android',
    //     os_version: '5'
    // },
    // sl_android_6: {
    //     base: 'BrowserStack',
    //     os: 'android',
    //     os_version: '6'
    // },

    // // chrome
    // sl_ios_chrome: {
    //     base: 'BrowserStack',
    //     browser: 'chrome'
    // },

    // sl_ie_8: {
    //     base: 'BrowserStack',
    //     browser: 'internet explorer',
    //     os: 'Windows 7',
    //     version: '8'
    // },
    // sl_ie_9: {
    //     base: 'BrowserStack',
    //     browser: 'internet explorer',
    //     os: 'Windows 7',
    //     version: '9'
    // },
    // sl_ie_10: {
    //     base: 'BrowserStack',
    //     browser: 'internet explorer',
    //     os: 'Windows 8',
    //     version: '10'
    // },
    // sl_ie_11: {
    //     base: 'BrowserStack',
    //     browser: 'internet explorer',
    //     os: 'Windows 8.1',
    //     version: '11'
    // },

    // sl_firefox: {
    //     base: 'BrowserStack',
    //     browser: 'firefox',
    //     os: 'Windows 7'
    // }
};

// 不支持本地运行
if (!process.env.TRAVIS) {
    console.error('不支持本地运行, 请使用 npm run test!');
    process.exit(1);
}

// 变量检查
// if (!process.env.BROWSER_STACK_USERNAME || !process.env.BROWSER_STACK_ACCESS_KEY) {
//     console.error('---------------');
//     console.error('Make sure the BROWSER_STACK_USERNAME and BROWSER_STACK_ACCESS_KEY environment variables are set.');
//     console.error('---------------');
//     process.exit(1);
// }

module.exports = function (config) {
    const options = Object.assign(base(config), {
        // reporters: ['mocha', 'BrowserStack'],
        reporters: ['dots', 'BrowserStack'],
        browserStack: {
            name: 'xpath-name',
            video: false,
            // startTunnel: false,
            project: 'xpath',
            build: 'xpath-build-' + process.env.TRAVIS_BUILD_NUMBER,
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
        },
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        captureTimeout: (1000 * 60) * 5,
        browserNoActivityTimeout: (1000 * 60) * 5
    });

    config.set(options);
};
