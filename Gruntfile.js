module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),

        // Metadata.
        meta: {
          basePath: '../',
          srcPath: '../src/',
          deployPath: '../deploy/'
        },

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ',

        jst: {
          compile: {
            options: {
              //namespace: "anotherNameThanJST",      //Default: 'JST'
              prettify: false,                        //Default: false|true
              amdWrapper: false,                      //Default: false|true
              templateSettings: {
              },
              processName: function(filename) {
                  //Shortens the file path for the template.
                  return filename.slice(filename.indexOf("template"), filename.length);
                }
              },
              files: {
                "public/templates/templates.js": ["public/templates/**/*.tpl"]
              }
            }
          },

          concat: {
            options: {
              separator: '\n',
            },
            dist: {
              src: ['data/client/socket.js','data/client/jquery.js','data/client/event_functions/*.js'],
              dest: 'public/socket_magic.js',
            },
          }

        });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task
    grunt.registerTask('default', ['concat']);

  };
