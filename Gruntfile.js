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
					src: ['**/*.jpg', '**/*.png', '**/*.webp'],
					cwd: 'img',
					dest: 'build',
				}],
			},
			scss: {
				files: [{
					expand: true,
					flatten: true,
					src: ['*.scss', 'vendor/*.scss'],
					cwd: 'src',
					dest: 'tmp',
				}],
			},
		},

		concat: {
			scss: {
				src: 'src/components/**/*.scss',
				dest: 'tmp/components.scss',
			},
		},

		sass: {
			css: {
				files: {
					'tmp/style.css': 'tmp/style.scss',
				},
				options: {
					loadPath: 'tmp',
				},
			},
		},

		'inline-assets':{
			build: {
				files: {
					'build/index.html': 'tmp/index.html',
				},
			},
		},

		browserify: {
			js: {
				files: {
					'tmp/app.js': 'src/app.js',
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
				files: ['src/**/*.html', 'src/**/*.js', 'src/**/*.jsx', 'src/**/*.scss'],
				tasks: ['default'],
			},
		},
	})

	grunt.registerTask('default', ['clean', 'copy', 'browserify', 'concat', 'sass', 'inline-assets'])
}