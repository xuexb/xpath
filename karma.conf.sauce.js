/**
 * @file karma配置
 * @author fe.xiaowu@gmail.com
 */

const base = require('./karma.conf.base.js');

const customLaunchers = {
    // sl_android_6_0: {
    //     base: 'SauceLabs',
    //     browserName: 'android'
    // },
    // sl_firefox: {
    //     base: 'SauceLabs',
    //     browserName: 'firefox'
    // },
    // sl_chrome: {
    //     base: 'SauceLabs',
    //     browserName: 'chrome',
    // },
    // sl_mac_safari: {
    //     base: 'SauceLabs',
    //     browserName: 'safari'
    // },
    sl_ie_11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 10'
    }
};

// 不支持本地运行
if (!process.env.TRAVIS) {
    console.error(`不支持本地运行, 请使用 \`npm run test\`!\n`);
    process.exit(1);
}

module.exports = function(config) {
    const options = Object.assign(base(config), {
        reporters: ['dots', 'saucelabs'],
        sauceLabs: {
            testName: 'xpath test case',
            recordScreenshots: false,
            startConnect: false,
            connectOptions: {
                'no-ssl-bump-domains': 'all'
            },

            public: 'public',

            build: 'build-' + Date.now()
        },
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        captureTimeout: 10000,
        browserNoActivityTimeout: 10000,
    });

    config.set(options);
};
