var path = require("path");

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    express: {
      server: {
        options: {
          port: 3000,
          server: path.resolve(__dirname, 'app.js'),
          serverreload: true
        }
      }
    }
    // },
    // watch: {
    //   scripts: {
    //     files: ['**/*.js'],
    //     options: {
    //       spawn: true,
    //     },
    //   },
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-express');
  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  //grunt.registerTask('default', ['']);

  grunt.registerTask('server', ['express', 'express-keepalive']);

  // grunt.registerTask('default', 'Log some stuff.', function() {
  //   grunt.log.write('Logging some stuff...').ok();
  // });

};
