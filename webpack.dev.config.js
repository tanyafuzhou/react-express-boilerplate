const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const precss = require('precss')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: [
      './src/index.js',
      'webpack-hot-middleware/client?path=http://localhost/__webpack_hmr'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: 'chunk/[name].js',
    publicPath: 'http://localhost/'
  },

  devtool: 'source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new HtmlWebpackPlugin({
      title: 'react-express-boilerplate',
      template: 'index.ejs'
    })
  ],
  resolve: {
    alias: {
      _: path.resolve(__dirname, 'src')
    },
    root: path.resolve('src'),
    modulesDirectories: ['node_modules'],

    extensions: ['', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'react-hmre'],
          plugins: ['transform-object-rest-spread']
        }
      },
      { test: /\.tsx?$/, loader: 'babel-loader!ts-loader' },
      {
        test: /\.(css|less)$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=10000&name=./images/[name].[ext]'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer({ browsers: ['> 1%', 'IE 9'] }), precss]
  },
  ts: {
    transpileOnly: true,
    declaration: false,
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '_/*': ['./src/*']
      },
      target: 'es6',
      jsx: 'preserve',
      moduleResolution: 'node',
      sourceMap: true
    },
    files: ['i-really-hope-you-dont-have-a-file-with-this-name']
  }
}
