#!/bin/bash
set -x

# initializde the package file
[ -r package.json ] || npm init -y

[ -r webpack.config.coffee ] || cat > webpack.config.coffee << EOF
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
    ]

  plugins: [

    # filename defacto required:
    # see https://github.com/jantimon/html-webpack-plugin/issues/340
    new HtmlWebpackPlugin(
      filename: 'index.html'
    )

  ]

module.exports = config
EOF

mkdir -p src
[ -r src/app.js ] || cat >> src/app.js << EOF
console.log('hello world');
EOF

[ -r .babelrc ] || cat >> .babelrc << EOF
{
  "presets": ["es2015","react"]
}
EOF


WEBPACK="
    webpack html-webpack-plugin file-loader
    resolve-url-loader eslint-loader raw-loader
    extract-text-webpack-plugin clean-webpack-plugin
    webpack-dev-server
"
COFFEE="coffeescript coffee-loader"
#BABEL="babel-cli babel-loader babel-preset-es2015 babel-preset-react"
BABEL="babel-cli babel-loader babel-preset-env babel-preset-react eslint"
PUG="pug pug-loader"

# https://github.com/shakacode/bootstrap-loader
BOOTSTRAP="css-loader style-loader url-loader bootstrap"
BOOTSTRAP_SASS="bootstrap-sass node-sass sass-loader"

UTIL="lodash"
REACT="react react-dom reactstrap react-router react-transition-group"
MOBX="mobx mobx-react"

npm install --save-dev $WEBPACK $COFFEE $BABEL $PUG $BOOTSTRAP
npm install --save $UTIL $REACT $MOBX
