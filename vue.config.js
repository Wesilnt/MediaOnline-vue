const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  lintOnSave: undefined,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.extractComments = true
      config.optimization.minimizer[0].options.uglifyOptions.output.comments = false
    }
  }
}
