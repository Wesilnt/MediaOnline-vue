module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 750,
      selectorBlackList: ['mint-']
    }
  }
}
