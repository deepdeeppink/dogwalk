
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    
    clean: [
      'js/**'
    ],
    
    babel: {
        options: {
            sourceMap: false,
            presets: ['es2015']
        },
        dist: {
            files: {
                'js/app.js': 'src/app.js'
            }
        }
    },

    watch: {
      js: {
        files: ['src/**/*.js'],
        tasks: ['js']
      }
    }
  });

  grunt.registerTask('js', ['clean', 'babel']);
  grunt.registerTask('default', ['watch']);
};