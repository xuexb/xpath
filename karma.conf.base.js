/**
 * @file karma配置
 * @author fe.xiaowu@gmail.com
 */

console.log('TRAVIS_ALLOW_FAILURE', process.env.TRAVIS_ALLOW_FAILURE);
console.log('TRAVIS_BRANCH', process.env.TRAVIS_BRANCH);
console.log('TRAVIS_BUILD_DIR', process.env.TRAVIS_BUILD_DIR);
console.log('TRAVIS_BUILD_ID', process.env.TRAVIS_BUILD_ID);
console.log('TRAVIS_BUILD_NUMBER', process.env.TRAVIS_BUILD_NUMBER);
console.log('TRAVIS_COMMIT', process.env.TRAVIS_COMMIT);
console.log('TRAVIS_COMMIT_MESSAGE', process.env.TRAVIS_COMMIT_MESSAGE);
console.log('TRAVIS_COMMIT_RANGE', process.env.TRAVIS_COMMIT_RANGE);
console.log('TRAVIS_EVENT_TYPE', process.env.TRAVIS_EVENT_TYPE);
console.log('TRAVIS_JOB_ID', process.env.TRAVIS_JOB_ID);
console.log('TRAVIS_JOB_NUMBER', process.env.TRAVIS_JOB_NUMBER);

module.exports = config => {
    return {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // Important: 所有插件必须在此声明
        plugins: ['karma-*'],

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        // Important: 下列数组中文件将『逆序载入』
        frameworks: ['mocha', 'chai', 'chai-sinon'],


        // list of files / patterns to load in the browser
        files: [
            'src/xpath.js',
            'node_modules/zepto/dist/zepto.js',
            'test/**/*.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/**/*.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            // 'progress',
            'mocha'
            // 'coverage',
        ],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // Note: 如果要调试Karma，请设置为DEBUG
        logLevel: config.LOG_INFO,

        coverageReporter: {
            // specify a common output directory
            dir: '.',
            reporters: [
                // { type: 'html', subdir: 'report-html' },
                {
                    type: 'lcov',
                    subdir: 'coverage'
                },
                {
                    type: 'text-summary'
                }
            ]
        },

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            // 'PhantomJS',
            // 'ChromeHeadless',
        ],

        // enable / disable watching file and executing tests whenever any file changes
        // Note: 代码改动自动运行测试，需要singleRun为false
        autoWatch: false,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        // 脚本调用请设为 true
        singleRun: true
    };
};
