const EncodingPlugin = require('webpack-encoding-plugin');

module.exports = {
  lintOnSave: undefined,
    configureWebpack: {
        plugins: [
            new EncodingPlugin({
                encoding: 'UTF-8'
            })
        ]
    }
}
