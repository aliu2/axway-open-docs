module.exports = function(grunt) {

  const checkLinks = require('md-link-checker')

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    markdownlint: {
      options: {
        config: {
          'default': true,
          'MD003': {'style': 'atx'},
          'MD004': {'style': 'asterisk'},
          'MD007': {'indent': 4},
          'MD026': {'punctuation': '.,;:!'},
          'MD029': {'style': 'ordered'},
          'MD040': false,
          'MD041': false,
          'MD046': {'style': 'fenced'},
        }
      },
      src: [
        'content/en/**/*.md'
      ]
    },

    md_link_checker: {
      src: ['content/en/**/*.md']
    }
  });

  grunt.loadNpmTasks('grunt-markdownlint');
  grunt.registerTask('default', ['md_link_checker']);

  grunt.registerMultiTask('md_link_checker', 'Check links in markdown even github private ones', function () {
    const done = this.async();
    const options = this.options({
        tokenFilePath: undefined,
    });

  this.files.forEach(function (f) {
            const src = f.src.filter(function (path) {
                if (!grunt.file.exists(path)) {
                    grunt.log.warn(`File ${path} not found.`);
                    return false;
                } else {
                     return true;
                }
            });
            const config = {
                files: src,
                tokenFilePath: options.tokenFilePath
            };

            return checkLinks(config).then(function (data) {
                grunt.log.ok('No dead links found');
                return done();
            }).catch(function (data) {
                if ()
                data.forEach(dead => grunt.log.warn(`Link ${dead.deadlinks.join(', ')} in ${dead.filename} not found.`));
                return done(false);
            });
        });
    });
};
