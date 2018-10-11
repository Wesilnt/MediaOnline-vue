const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { NODE_ENV } = process.env
const isProd = NODE_ENV === 'production'
module.exports = {
  lintOnSave: undefined,
  configureWebpack: {
    plugins: [
      new uglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console: isProd,
            drop_debugger: isProd
          }
        }
      })
    ]
  }
}
