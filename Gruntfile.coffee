module.exports = (grunt) ->

  'use strict'

  grunt.util.linefeed = '\n'

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    banner: '/*!\n' +
            ' * bilibili_hkj v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */'

    clean:
      build: 'build/'
      release: 'release/<%= pkg.version %>/'

    jshint:
      options:
        jshintrc: '.jshintrc'
      src:
        src: 'build/js/**/*.js'

    coffee:
      build:
        expand: true
        cwd: 'coffee'
        src: '**/*.coffee'
        dest: 'build/js/'
        ext: '.src.js'

    copy:
      main:
        expand: true
        cwd: 'build/js/'
        src: '**'
        dest: 'release/<%= pkg.version %>/js/'

    uglify:
      options:
        sourceMap: true
        compress: true
        beautify:
          ascii_only: true
      js:
        files: [
          expand: true
          cwd: 'release/<%= pkg.version %>/js/'
          src: '**/*.src.js'
          dest: 'release/<%= pkg.version %>/js/'
          ext: '.min.js'
        ]

    usebanner:
      options:
        position: 'top',
        banner: '<%= banner %>'
      files:
        src: ['build/js/**/*.js', 'release/<%= pkg.version %>/js/**/*.js', 'build/css/**/*.css', 'release/<%= pkg.version %>/css/**/*.css']

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-banner'

  grunt.registerTask 'build', ['clean', 'coffee']
  grunt.registerTask 'test', ['build']
  grunt.registerTask 'publish', ['test', 'copy', 'uglify', 'usebanner', 'clean:build']
  grunt.registerTask 'default', ['test']
