/**
 * @file karma配置
 * @author fe.xiaowu@gmail.com
 */

const base = require('./karma.conf.base.js');

const customLaunchers = {
    sl_android_6_0: {
        base: 'SauceLabs',
        browserName: 'android',
        version: '6.0'
    },
    sl_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox'
    },
    sl_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
    },
    sl_mac_safari: {
        base: 'SauceLabs',
        browserName: 'safari',
        version: '10'
    },
    sl_ie_11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 10',
        version: '11'
    }
};

module.exports = function(config) {
    const options = Object.assign(base(config), {
        reporters: process.env.CI ? ['dots', 'saucelabs'] : ['progress', 'saucelabs'],
        sauceLabs: {
            testName: 'xpath test case',
            recordScreenshots: false,
            startConnect: false,
            connectOptions: {
                'no-ssl-bump-domains': 'all'
            }
        },
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        captureTimeout: 300000,
        browserNoActivityTimeout: 300000,
    });

    config.set(options);
};
