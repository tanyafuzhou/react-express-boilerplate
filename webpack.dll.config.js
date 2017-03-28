const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router']
  },

  output: {
    path: path.join(__dirname, 'libs'),
    filename: '[name].js',
    chunkFilename: 'chunk/[name].js',
    library: '[name]_[chunkhash]'
  },

  plugins: [
    new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]_[chunkhash]',
      context: __dirname
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        drop_console: true
      }
    })
  ],
  resolve: {
    alias: {
      _: path.resolve(__dirname, 'src')
    },
    root: path.resolve('src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  }
}
