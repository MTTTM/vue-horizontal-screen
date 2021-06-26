const { src, dest } = require('gulp');
const babel = require('gulp-babel');
let uglify = require('gulp-uglify-es').default;
var rename = require("gulp-rename");
const a = function (cb) {
  src("./src/index.js")
    .pipe(babel({
      "presets": [
        [
          "@babel/preset-env",
          {
            "useBuiltIns": "entry",//兼容，依赖core-js
            "corejs": '3',
            loose: true,
            modules: false
          }
        ]
      ]
    }))
    .pipe(uglify({
      compress: {
        warnings: false,
        pure_funcs: ['console.log'],
        drop_debugger: true,  // 过滤 debugger
      }
    }
    ))
    .pipe(rename({ suffix: '.es.min' }))
    .pipe(dest("./dist/"))
  cb();
}
//编译js6到指定文件目录
exports.default = a;