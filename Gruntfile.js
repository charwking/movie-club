module.exports = function (grunt) {

    var config = require('./project.conf.js');

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        clean: {
            outputDir: [config.output.dir]
        },

        concat: {
            internal: {
                src: config.input.js.internal,
                dest: config.output.js.internal
            }
        },

        copy: {
            index: {
                files: [{
                    cwd: config.input.dir,
                    src: config.input.html.internal,
                    dest: config.output.dir,
                    expand: true
                }]
            }
        }
    });

    grunt.registerTask('compile', ['clean', 'copy', 'concat']);
};
