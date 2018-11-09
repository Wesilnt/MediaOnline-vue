module.exports = {
  presets: ['@vue/app'],
  plugins: [
      ["transform-object-rest-spread"],
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ]
  ]
}
