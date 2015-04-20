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

        cacheBust: {
            options: {
                rename: false
            },
            all: {
                files: [{
                    src: config.output.html
                }]
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
                src: config.input.less.root,
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
                files: [
                    config.output.dir + '/*.*',
                    '!' + config.output.html
                ],
                tasks: 'cacheBust',
                options: {
                    livereload: config.dev.server.livereload
                }
            },

            index: {
                files: config.input.html.internal,
                tasks: 'copy:index',
                options: {
                    livereload: config.dev.server.livereload
                }
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
                files: config.input.less.internal,
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
    grunt.registerTask('serve', ['compile', 'cacheBust', 'connect', 'watch']);
};
