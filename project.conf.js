var dirs = {
    output: 'dist/',
    source: 'src/',
    npm: 'node_modules/'
};

module.exports = {

    output: {
        dir: dirs.output,
        js: {
            internal: dirs.output + 'internal.js',
            external: dirs.output + 'external.js'
        },
        templates: dirs.output + 'templates.js'
    },

    input: {
        dir: dirs.source,
        html: {
            internal: [
                dirs.source + 'index.html'
            ]
        },
        js: {
            internal: [
                dirs.source + '**/*.module.js',
                dirs.source + '**/*.js',
                '!**/*.spec.js'
            ],
            external: [
                dirs.npm + 'angular/angular.js',
                dirs.npm + 'angular-ui-router/release/angular-ui-router.js'
            ]
        },
        templates: [
            dirs.source + '**/*.html',
            '!' + dirs.source + 'index.html'
        ]
    },

    dev: {
        server: {
            protocol: 'http',
            hostname: 'localhost',
            port: 8000,
            livereload: true
        }
    }
};
