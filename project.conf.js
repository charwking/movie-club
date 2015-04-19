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
        }
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
                dirs.npm + 'angular/angular.js'
            ]
        }
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
