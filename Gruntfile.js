module.exports = function(grunt) {
    grunt.initConfig({
        karma: {
            unit: {configFile: 'tests/karma.conf.js'}
        }
    });

    grunt.loadNpmTasks('grunt-karma');
};