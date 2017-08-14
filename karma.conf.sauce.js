/**
 * @file karma配置
 * @author fe.xiaowu@gmail.com
 */

const base = require('./karma.conf.base.js');

const customLaunchers = {
    sl_android_6_0: {
        base: 'SauceLabs',
        browserName: 'android'
    },
    // sl_firefox: {
    //     base: 'SauceLabs',
    //     browserName: 'firefox'
    // },
    sl_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
    },
    sl_mac_safari: {
        base: 'SauceLabs',
        browserName: 'safari'
    },
    // sl_ie_10: {
    //     base: 'SauceLabs',
    //     browserName: 'internet explorer',
    //     platform: 'Windows 8',
    //     version: '10'
    // },
    // sl_ie_11: {
    //     base: 'SauceLabs',
    //     browserName: 'internet explorer',
    //     platform: 'Windows 8.1',
    //     version: '11'
    // },
};

// 不支持本地运行
if (!process.env.TRAVIS) {
    console.error('不支持本地运行, 请使用 npm run test!');
    process.exit(1);
}

// 变量检查
if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.error('---------------');
    console.error('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
    console.error('---------------');
    process.exit(1);
}

module.exports = function (config) {
    const options = Object.assign(base(config), {
        reporters: ['progress', 'saucelabs'],
        sauceLabs: {
            'testName': 'xpath test case',
            'recordVideo': false,
            'recordScreenshots': false,
            'startConnect': false,
            'connectOptions': {
                'no-ssl-bump-domains': 'all'
            },
            'public': 'public',
            'build': process.env.CIRCLE_BUILD_NUM || process.env.SAUCE_BUILD_ID || 'build-' + Date.now(),
            'tunnelIdentifier': process.env.TRAVIS_JOB_NUMBER
        },
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        captureTimeout: (1000 * 60) * 5,
        browserNoActivityTimeout: (1000 * 60) * 5
    });

    config.set(options);
};
