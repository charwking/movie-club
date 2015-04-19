module.exports = function (grunt) {

    var config = require('./project.conf.js');

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        clean: {
            outputDir: [config.outputDir]
        },

        concat: {
            internal: {
                src: [config.srcDir + '/**/*.module.js'],
                dest: config.outputDir + '/internal.js'
            }
        },

        copy: {
            index: {
                files: [{
                    cwd: config.srcDir,
                    src: ['index.html'],
                    dest: config.outputDir,
                    expand: true
                }]
            }
        }
    });

    grunt.registerTask('compile', ['clean', 'copy', 'concat']);
};
