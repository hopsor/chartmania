module.exports = (grunt)->

  grunt.initConfig {
    pkg: grunt.file.readJSON 'package.json'

    coffee:
      compile:
        expand: true
        flatten: true
        cwd: 'src/scripts'
        src: ['*.coffee']
        dest: 'dist/scripts/'
        ext: '.js'

    jade:
      html:
        files:
          'dist':['src/index.jade'],
          'dist/views':['src/views/*.jade']
        options:
          client: false
          runtime: false

    sass:
      dist:
        files: [{
          expand: true
          cwd: 'src/styles'
          src: ['*.scss']
          dest: 'dist/styles'
          ext: '.css'
        }]
        # files:
        #   # 'dist/styles/main.css': 'src/styles/main.scss'
        #   'dist/styles/': 'src/styles/*.scss'

    connect: 
      server:
        options:
          hostname: '0.0.0.0'
          port: 9001
          base: "dist"
          keepalive: false

    watch:
      scripts:
        files: ['src/views/*.jade', 'src/index.jade', 'src/scripts/*.coffee', 'src/scripts/**/*.coffee', 'src/styles/*.scss', 'src/styles/**/*.scss']
        tasks: ['default']
      options:
          livereload: true

  }

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-jade'
  grunt.loadNpmTasks 'grunt-sass'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'

  grunt.registerTask 'default', ['coffee', 'jade', 'sass']
  grunt.registerTask 'serve', ['default', 'connect', 'watch']
