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
                src: config.out.cssFile
            }
        },

        cacheBust: {
            options: {
                rename: false
            },
            all: {
                files: [{
                    src: config.out.htmlMainFile
                }]
            }
        },

        clean: {
            outputDir: [config.out.dir]
        },

        concat: {
            internal: {
                src: config.in.jsAppClientFiles,
                dest: config.out.jsAppClientFile
            },

            external: {
                src: config.in.jsThirdPartyClientFiles,
                dest: config.out.jsThirdPartyClientFile
            }
        },

        connect: {
            server: {
                options: {
                    base: config.out.dir,
                    protocol: config.dev.serverProtocol,
                    hostname: config.dev.serverHostname,
                    port: config.dev.serverPort,
                    open: true,
                    livereload: config.dev.serverLivereload
                }
            }
        },

        copy: {

            fonts: {
                files: [{
                    src: config.in.fontFiles,
                    dest: config.out.fontDir,
                    expand: true,
                    flatten: true
                }]
            },

            images: {
                files: [{
                    src: config.in.imageFiles,
                    dest: config.out.imageDir,
                    expand: true,
                    flatten: true
                }]
            },

            index: {
                files: [{
                    src: config.in.htmlMainFile,
                    dest: config.out.dir,
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
                src: config.in.htmlTemplateFiles,
                dest: config.out.htmlTemplateFile
            }
        },

        jscs: {
            all: [
                'Gruntfile.js',
                config.in.jsAppClientFiles,
                config.in.jsAppTestFiles
            ],
            options: {
                config: '.jscsrc'
            }
        },

        jshint: {
            all: [
                'Gruntfile.js',
                config.in.jsAppClientFiles,
                config.in.jsAppTestFiles
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        less: {
            all: {
                src: config.in.lessMainFile,
                dest: config.out.cssFile,
                options: {
                    compress: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapFilename: config.out.cssMapFile,
                    sourceMapURL: config.out.cssMapUrl
                }
            }
        },

        ngAnnotate: {
            internal: {
                src: config.out.jsAppClientFile,
                dest: config.out.jsAppClientFile
            }
        },

        uglify: {
            all: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: config.out.jsDir,
                    src: '**/*.js',
                    dest: config.out.jsDir
                }]
            }
        },

        watch: {

            dist: {
                files: [
                    config.out.dir + '/**/*.*',
                    '!' + config.out.htmlMainFile
                ],
                tasks: 'cacheBust',
                options: {
                    livereload: config.dev.serverLivereload
                }
            },

            images: {
                files: config.in.imageFiles,
                tasks: 'copy:images'
            },

            index: {
                files: config.in.htmlMainFile,
                tasks: 'copy:index',
                options: {
                    livereload: config.dev.serverLivereload
                }
            },

            jsInternal: {
                files: config.in.jsAppClientFiles
                    .concat(config.in.jsAppTestFiles),
                tasks: ['analyze', 'concat:internal']
            },

            jsExternal: {
                files: config.in.jsThirdPartyClientFiles,
                tasks: ['analyze', 'concat:external']
            },

            less: {
                files: config.in.lessFiles,
                tasks: 'css'
            },

            templates: {
                files: config.in.htmlTemplateFiles,
                tasks: 'html2js'
            }
        }
    });

    grunt.registerTask('analyze', ['jshint', 'jscs', 'karma:unit']);
    grunt.registerTask('css', ['less', 'autoprefixer']);
    grunt.registerTask('compile', ['clean', 'copy', 'concat', 'css', 'html2js', 'analyze']);
    grunt.registerTask('optimize', ['ngAnnotate', 'uglify']);
    grunt.registerTask('package', ['compile', 'optimize']);
    grunt.registerTask('serve', ['compile', 'cacheBust', 'connect', 'watch']);
};
