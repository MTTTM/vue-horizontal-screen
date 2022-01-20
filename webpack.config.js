var path = require('path')
var webpack = require('webpack')
const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
///获取本机ip///
function getIPAdress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
const myHost = getIPAdress();
console.log("%chttp://" + myHost + ":8080", 'color:red')


module.exports = {
  entry: './src/vue/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader",
        }]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,//不需要去转译"node\_modules"这里面的文件。
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff|woff2?|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    host: myHost,
  },
  performance: {
    hints: false
  },
  devtool: "#source-map",
}

//开发环境入口
console.log("env", process.env.NODE_ENV, 'lang_Env', process.env.lang_ENV)
if (process.env.NODE_ENV === "development") {
  if (process.env.lang_ENV === 'react') {
    let entry = { entry: './src/react/index.js' }
    module.exports = Object.assign({}, module.exports, entry)
    console.log("module.exports", module.exports.entry)
  }
  else {
    let entry = { entry: './src/vue/index.js' }
    module.exports = Object.assign({}, module.exports, entry)
  }
  module.exports.plugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',// 定义的html为模板生成 从根路径开始查找
      inject: 'body',
      minify: {// 压缩HTML文件
        removeComments: true,//去除注释
        collapseWhitespace: true,//去除空格
      },
    }),
  ]
}
else if (process.env.NODE_ENV === "production") {
  module.exports.entry = {
    react: './src/react/src/index.js',
    vue: './src/vue/src/index.js'
  };
  module.exports.output = {
    filename: '[name].horizontalScreen.es.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'HorizontalScreen',
    libraryTarget: 'umd'
  }
}


if (process.env.NODE_ENV === "production") {
  // module.exports.devtool = 'none';
  // // http://vue-loader.vuejs.org/en/workflow/production.html
  // module.exports.plugins = (module.exports.plugins || []).concat([
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: '"production"'
  //     }
  //   }),
  // new webpack.optimize.UglifyJsPlugin({
  //   sourceMap: true,
  //   compress: {
  //     warnings: false,
  //     drop_console: true
  //   }
  // }),
  // new webpack.LoaderOptionsPlugin({
  //   minimize: true
  // })

  // ])
}

