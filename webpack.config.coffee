
webpack = require('webpack')
path = require('path')

HtmlWebpackPlugin = require('webpack-html-plugin')
ExtractTextPlugin = require('extract-text-webpack-plugin')

config =

  entry: './src/app.jsx'

  node:   # hacks for supporting bunyan... not sure the implications.
    fs: 'empty'
    module: 'empty'

  resolve:
    extensions: [ '.js', '.jsx' ]

  devtool: "source-map"

  output:
    path: path.resolve(__dirname, 'dist')
    filename: 'bundle.js'

  module:
    rules: [
        {
            test: /\.(js|jsx)$/
            use: 'babel-loader'
        },
        {
            test: /\.(js|jsx)$/
            enforce: "pre"
            exclude: /node_modules/
            use: 'eslint-loader'
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract(
            fallback: 'style-loader'
            use:
              loader: 'css-loader'
              options:
                sourceMap: true
          )
        },
    ],

    # https://github.com/trentm/node-bunyan#webpack
    noParse: [/dtrace-provider$/, /safe-json-stringify$/, /mv/],

  plugins: [
    # http://getbootstrap.com/docs/4.0/getting-started/webpack/
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    # filename defacto required:
    # see https://github.com/jantimon/html-webpack-plugin/issues/340
    new HtmlWebpackPlugin(
      filename: 'index.html',
      template: 'src/index.html',
      inject: 'body',
    )
    new ExtractTextPlugin("[name].css")
  ]

module.exports = config
