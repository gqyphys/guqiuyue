module.exports = function(grunt) {
  /*
  grunt所有模块通用参数：
  filter：一个返回布尔值的函数，用于过滤文件名。只有返回值为true的文件，才会被grunt处理
  dot：是否匹配以点号（.）开头的系统文件
  makeBase：如果设置为true，就只匹配文件路径的最后一部分。比如，a?b可以匹配/xyz/123/acb，而不匹配/xyz/acb/123

  通配符含义：
  *：匹配任意数量的字符，不包括/。
  ?：匹配单个字符，不包括/。
  **：匹配任意数量的字符，包括/。
  {}：允许使用逗号分隔的列表，表示“or”（或）关系。
  !：用于模式的开头，表示只返回不匹配的情况。
  */

  // 配置Grunt各种模块的参数
  grunt.initConfig({
    /*语法检查*/
    // jshint: { /* jshint的参数 */ },
    uglify: {
      /* uglify的参数 */
      target: {
        /*如果设为true，就表示下面文件名的占位符（即*号）都要扩展成具体的文件名*/
        expand: true,
        /*需要处理的文件（input）所在的目录*/
        cwd: '',
        /*表示需要处理的文件,
        如果采用数组形式，数组的每一项就是一个文件名，可以使用通配符*/
        src: '',
        /*表示处理后的文件名或所在目录*/
        dest: '',
        /*表示处理后的文件后缀名*/
        ext: '.min.js'
      }
    },
    cssmin: {
      /*压缩css文件*/
      target: {
        /*如果设为true，就表示下面文件名的占位符（即*号）都要扩展成具体的文件名*/
        expand: true,
        /*需要处理的文件（input）所在的目录*/
        cwd: '',
        /*
        表示需要处理的文件,
        如果采用数组形式，数组的每一项就是一个文件名，可以使用通配符
        */
        src: '',
        /*表示处理后的文件名或所在目录*/
        dest: '',
        /*表示处理后的文件后缀名*/
        ext: '.min.css'
      },
    },
    watch: {
      scripts: {
        /*排除压缩文件和配置文件*/
        files: ['**/*.js', '!**/*.min.js', '!Gruntfile.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['**/*.css', '!**/*.min.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false,
        }
      }
    }
  });

  // On watch events configure jshint:all to only run on changed file
  grunt.event.on('watch', function(action, filepath) {
    var path_js = filepath.replace(/([^\/]+\.js)$/g,"");
    var path_css = filepath.replace(/([^\/]+\.css)$/g,"");
    var file = filepath.replace(/([^\/]+[\/])/g,"");
    grunt.config('uglify.target.cwd', path_js);
    grunt.config('uglify.target.src', file);
    grunt.config('uglify.target.dest', path_js);
    grunt.config('cssmin.target.cwd', path_css);
    grunt.config('cssmin.target.src', file);
    grunt.config('cssmin.target.dest', path_css);
  });


  // 从node_modules目录加载模块文件
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  /*
  grunt.registerTask方法定义如何调用具体的任务。
  “default”任务表示如果不提供参数，直接输入grunt命令，则先运行“cssmin:minify”，
  后运行“cssmin:combine”，即先压缩再合并。
  如果只执行压缩，或者只执行合并，则需要在grunt命令后面指明“模块名:目标名”。
  如果不指明目标，只是指明模块，就表示将所有目标依次运行一遍
  */
  // 每行registerTask定义一个任务
  grunt.registerTask('default', ['watch']);
  // grunt.registerTask('check', ['jshint']);
  // grunt.registerTask('minjs', ['uglify']);
  // grunt.registerTask('mincss', ['cssmin']);

};
