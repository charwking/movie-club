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
        cssFile: dirs.output + 'app.css',
        cssMapFile: dirs.output + 'app.css.map',
        cssMapUrl: 'app.css.map',
        htmlMainFile: dirs.output + 'index.html',
        htmlTemplateFile: dirs.output + 'templates.js',
        jsAppClientFile: dirs.output + 'internal.js',
        jsThirdPartyClientFile: dirs.output + 'external.js'
    },

    in: {
        dir: dirs.source,
        htmlMainFile: dirs.source + 'index.html',
        htmlTemplateFiles: [
            dirs.source + '**/*.html',
            '!' + dirs.source + 'index.html'
        ],
        jsAppClientFiles: [
            dirs.source + '**/*.module.js',
            dirs.source + '**/*.js'
        ],
        jsAppTestFiles: dirs.test + '**/*.js',
        jsThirdPartyClientFiles: [
            dirs.bower + 'angular/angular.js',
            dirs.bower + 'angular-ui-router/release/angular-ui-router.js',
            dirs.bower + 'angular-google-analytics/dist/angular-google-analytics.js',
            dirs.bower + 'firebase/firebase.js',
            dirs.bower + 'angularfire/dist/angularfire.js'
        ],
        jsThirdPartyTestFiles: [
            dirs.npm + 'angular-mocks/angular-mocks.js'
        ],
        lessMainFile: dirs.source + 'styles/app.less'
    },

    dev: {
        serverProtocol: 'http',
        serverHostname: 'localhost',
        serverPort: 8000,
        serverLivereload: true
    }
};
