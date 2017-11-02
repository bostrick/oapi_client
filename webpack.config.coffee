HtmlWebpackPlugin = require('webpack-html-plugin')
webpack = require('webpack')
path = require('path')

config =

  entry: './src/app.js'

  output:
    path: path.resolve(__dirname, 'dist')
    filename: 'bundle.js'

  module:
    rules: [
        {
            test: /\.(js|jsx)$/
            use: 'babel-loader'
        }
        {
            test: /\.(js|jsx)$/
            enforce: "pre"
            exclude: /node_modules/
            use: 'eslint-loader'
        }
    ]

  plugins: [

    # filename defacto required:
    # see https://github.com/jantimon/html-webpack-plugin/issues/340
    new HtmlWebpackPlugin(
      filename: 'index.html'
    )

  ]

module.exports = config
