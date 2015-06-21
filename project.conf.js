var dirs = {
    output: 'dist/',
    source: 'src/',
    test: 'test/',
    bower: 'bower_components/',
    npm: 'node_modules/'
};

module.exports = {

    out: {
        dir: dirs.output,
        cssFile: dirs.output + 'css/app.css',
        cssMapFile: dirs.output + 'css/app.css.map',
        cssMapUrl: 'css/app.css.map',
        fontDir: dirs.output + '/fonts',
        htmlMainFile: dirs.output + 'index.html',
        htmlTemplateFile: dirs.output + 'js/templates.js',
        imageDir: dirs.output + '/images',
        jsDir: dirs.output + 'js/',
        jsAppClientFile: dirs.output + 'js/internal.js',
        jsThirdPartyClientFile: dirs.output + 'js/external.js'
    },

    in: {
        dir: dirs.source,
        fontFiles: dirs.bower + 'font-awesome/fonts/**/*',
        htmlMainFile: dirs.source + 'index.html',
        htmlTemplateFiles: [
            dirs.source + '**/*.html',
            '!' + dirs.source + 'index.html'
        ],
        imageFiles: dirs.source + 'images/**/*',
        jsAppClientFiles: [
            dirs.source + 'app.js',
            dirs.source + '**/*.js',
            '!' + dirs.source + '**/*.spec.js'
        ],
        jsAppTestFiles: dirs.source + '**/*.spec.js',
        jsThirdPartyClientFiles: [
            dirs.bower + 'angular/angular.js',
            dirs.bower + 'angular-ui-router/release/angular-ui-router.js',
            dirs.bower + 'angular-google-analytics/dist/angular-google-analytics.js',
            dirs.bower + 'firebase/firebase.js',
            dirs.bower + 'angularfire/dist/angularfire.js',
            dirs.bower + 'lodash/lodash.js'
        ],
        jsThirdPartyTestFiles: [
            dirs.npm + 'angular-mocks/angular-mocks.js'
        ],
        lessFiles: dirs.source + '/**/*.less',
        lessMainFile: dirs.source + 'styles/app.less'
    },

    dev: {
        serverProtocol: 'http',
        serverHostname: 'localhost',
        serverPort: 8000,
        serverLivereload: true
    }
};
