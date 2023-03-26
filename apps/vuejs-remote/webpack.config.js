const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
module.exports = (env = {}) => ({
  optimization: {
    runtimeChunk: false,
    splitChunks: false
  },
  mode: 'development',
  cache: false,
  target: 'es2020',
  devtool: false,
  target: 'web',
  entry: path.resolve(__dirname, './src/main.ts'),
  experiments: {
    outputModule: true
  },
  output: {
    library: { type: 'module' },
    filename: '[name].js',
    publicPath: 'auto'
  },
  resolve: {
    extensions: ['.vue', '.ts', '.tsx', '.jsx', '.js', '.json'],
    alias: {
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      vue: '@vue/runtime-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          reactivityTransform: true
        }
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 8192 }
        }
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new ModuleFederationPlugin({
      name: 'home',
      filename: 'remoteEntry.js',
      library: { type: 'module' },
      exposes: {
        './App': './src/bootstrap'
      },
      shared: {
        vue: {
          // singleton: true,
          // import: false,
          requiredVersion: '^3.0.0'
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: false
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname)
    },
    compress: true,
    port: 5500,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  }
})
