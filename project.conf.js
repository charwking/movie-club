var dirs = {
    output: 'dist',
    source: 'src',
    npm: 'node_modules'
};

module.exports = {

    output: {
        dir: dirs.output,
        js: {
            internal: dirs.output + '/internal.js',
            external: dirs.output + '/external.js'
        }
    },

    input: {
        dir: dirs.source,
        html: {
            internal: ['index.html']
        },
        js: {
            internal: [
                dirs.source + '/**/*.module.js',
                dirs.source + '/**/*.js',
                '!**/*.spec.js'
            ],
            external: [
                dirs.npm + '/angular/angular.js'
            ]
        }
    }
};
