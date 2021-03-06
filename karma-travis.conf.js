module.exports = function (config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        plugins: [
            require("karma-jasmine"),
            require("karma-typescript"),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
        ],
        files: [
            { pattern: "lib/**/*.ts" },
            { pattern: "test/**/*.ts" }
        ],
        exclude: [
        ],
        preprocessors: {
            "lib/**/*.ts": ["karma-typescript", "coverage"],
            "test/**/*.ts": ["karma-typescript"]
        },
        reporters: ["kjhtml", "progress", "coverage"],
        customLaunchers: {
            // chrome setup for travis CI using chromium
            Chrome_travis_ci: {
                base: "Chrome",
                flags: [" — no-sandbox"]
            }
        },
        browsers: ["Chrome"],
        karmaTypescriptConfig: {
            bundlerOptions: {
                transforms: [require("karma-typescript-es6-transform")()]
            },
            compilerOptions: {
                "module": "commonjs",
                "target": "es6", // use es6 only for karma compiler (using es6 will help increase coverage because less junk code required for es5 is needed)
                "lib": ["es2015", "es2017", "dom"],
                "exclude": [
                    "node_modules"
                ]
            },
        },
        coverageReporter: {
            reporters: [
                { type: 'html', subdir: 'html' },
                { type: 'lcov', subdir: 'lcov' },
                { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' }
            ]
        },
        port: 9669,
        colors: true,
        autoWatch: false,
        browsers: ["Chrome"],
        singleRun: true,
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        logLevel: config.LOG_ERROR,
    });
};
