module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt)
  grunt.initConfig({
    
    clean: [
      'build/*',
      'tmp/*',
    ],

    copy: {
      html: {
        files: [{
          expand: true,
          src: '**/*.html',
          cwd: 'src',
          dest: 'tmp',
        }],
      },
      img: {
        files: [{
          expand: true,
          src: '**/*.jpg',
          cwd: 'img',
          dest: 'build',
        }],
      },
    },

    sass: {
      css: {
        files: {
          'tmp/css/style.css': 'src/css/style.scss',
        },
        options: {
          sourceMap: false,
        },
      },
    },

    'inline-assets':{
      build: {
        // options:{
        //   encoding:'utf8',
        // },
        files: {
          'build/index.html': 'tmp/index.html',
        },
      },
    },

    browserify: {
      js: {
        files: {
          'tmp/js/app.js': 'src/js/app.js',
        },
        options: {
          transform: [[
            'babelify', {
              presets: ['react', 'es2015', 'stage-0'],
            },
          ]],
        },
      },
    },

    watch: {
      build: {
        files: ['src/**/*.html', 'src/**/*.js', 'src/**/*.scss'],
        tasks: ['default'],
      },
    },
  })

  grunt.registerTask('default', ['clean', 'copy', 'sass', 'browserify', 'inline-assets'])
}