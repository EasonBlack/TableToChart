requirejs.config({

    paths: {
        'dust': '../vendor/dust-full-1.1.1',
        'rdust': '../vendor/require-dust',
        'jquery': '../vendor/jquery',
        'hammer': '../vendor/hammer2',
        'underscore': '../vendor/lodash.min',
        'q': '../vendor/q',
        'Highcharts': '../vendor/highcharts.4.1.9.src'
    },
    shim: {
        'dust': {
            'exports': 'dust'
        },
        'hammer': ['jquery'],

        'Highcharts': {
            'exports': 'Highcharts'
        }
    },
    deps: ['app']
});