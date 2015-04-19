var dirs = {
    output: 'dist',
    input: 'src'
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
        dir: dirs.input,
        html: {
            internal: ['index.html']
        },
        js: {
            internal: [
                dirs.input + '/**/*.module.js',
                dirs.input + '/**/*.js',
                '!**/*.spec.js'
            ]
        }
    }
};
