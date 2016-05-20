module.exports = function(grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg : grunt.file.readJSON('package.json'),
        banner :
            '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> Jeff Brannon;' +
            ' Licensed MIT */\n',
        // Task configuration
        concat : {
          options : {banner : '<%= banner %>', stripBanners : true},
          dist : {src : [
              'source/module.js',
              'source/injector.js',
              'source/observableMethods.js'
          ], dest : 'dist/mosquitwo.js'}
        },
        uglify : {
          options : {banner : '<%= banner %>'},
          dist : {src : '<%= concat.dist.dest %>', dest : 'dist/mosquitwo.min.js'}
        },
        jshint : {
            options : {
                node : true,
                curly : true,
                eqeqeq : true,
                immed : true,
                latedef : false,
                newcap : false,
                noarg : true,
                sub : true,
                undef : true,
                eqnull : true,
                boss : true,
                supernew: true,
                unused: false,
                validthis: true,
                globals: {
                    window: false
                }
            },
            gruntfile : {src : 'gruntfile.js'},
            beforeconcat: ['source/*.js'],
            afterconcat: ['dist/output.js']
        }
//        nodeunit : {
//            all : [ 'test/initialiseTests.js', 'test/**/*_test.js' ]
//        },
//        qunit : {
//            all : [ 'test/initialiseTests.js', 'test/**/*_test.js' ]
//        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    // Default task
    grunt.registerTask('dist', [ 'jshint', 'concat', 'uglify' ]);
};
