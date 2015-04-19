module.exports = function (grunt) {

    var config = require('./project.conf.js');

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        autoprefixer: {
            options: {
                browsers: ['last 2 versions'],
                map: true
            },
            all: {
                src: config.output.less.css
            }
        },

        clean: {
            outputDir: [config.output.dir]
        },

        concat: {
            internal: {
                src: config.input.js.internal,
                dest: config.output.js.internal
            },

            external: {
                src: config.input.js.external,
                dest: config.output.js.external
            }
        },

        connect: {
            server: {
                options: {
                    base: config.output.dir,
                    protocol: config.dev.server.protocol,
                    hostname: config.dev.server.hostname,
                    port: config.dev.server.port,
                    open: true,
                    livereload: config.dev.server.livereload
                }
            }
        },

        copy: {
            index: {
                files: [{
                    src: config.input.html.internal,
                    dest: config.output.dir,
                    expand: true,
                    flatten: true
                }]
            }
        },

        html2js: {

            options: {
                fileHeaderString: '(function (angular) {\n\'use strict\';\n',
                fileFooterString: '}(window.angular));'
            },

            main: {
                src: config.input.templates,
                dest: config.output.templates
            }
        },

        jscs: {
            all: [
                'Gruntfile.js',
                config.input.dir + '/**/*.js'
            ],
            options: {
                config: '.jscsrc'
            }
        },

        jshint: {
            all: [
                'Gruntfile.js',
                config.input.dir + '/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        less: {
            all: {
                src: config.input.less,
                dest: config.output.less.css,
                options: {
                    compress: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapFilename: config.output.less.map,
                    sourceMapURL: config.output.less.mapUrl
                }
            }
        },

        watch: {

            dist: {
                files: config.output.dir + '/*.*',
                tasks: [],
                options: {
                    livereload: config.dev.server.livereload
                }
            },

            copyIndex: {
                files: config.input.html.internal,
                tasks: 'copy:index',
            },

            jsInternal: {
                files: config.input.js.internal,
                tasks: ['analyze', 'concat:internal']
            },

            jsExternal: {
                files: config.input.js.external,
                tasks: ['analyze', 'concat:external']
            },

            less: {
                files: config.input.less,
                tasks: 'css'
            },

            templates: {
                files: config.input.templates,
                tasks: 'html2js'
            }
        }
    });

    grunt.registerTask('analyze', ['jshint', 'jscs']);
    grunt.registerTask('css', ['less', 'autoprefixer']);
    grunt.registerTask('compile', ['clean', 'analyze', 'copy', 'concat', 'css', 'html2js']);
    grunt.registerTask('serve', ['compile', 'connect', 'watch']);
};
