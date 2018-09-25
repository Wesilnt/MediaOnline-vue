module.exports = {
  plugins: [
    require('postcss-theme-variables')({
      vars: {
        red: '#E93423',
        gray: '#CCC',
        green: '#76C282',
        orange: '#FEA32F',
        blue: '#3175F6',
        'button-primary-background-color': '#FEA32F',
        'button-primary-border-color': '#FEA32F',
        'active-color': '#FEA32F'
      },
      prefix: '$'
    }),
    require('precss')(),
    require('postcss-calc')(),
    require('autoprefixer')({
      browsers: ['Android >= 4.0', 'iOS >= 7']
    }),
    require('postcss-px-to-viewport')({
      viewportWidth: 750, // (Number) The width of the viewport.
      viewportHeight: 1334, // (Number) The height of the viewport.
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
      viewportUnit: 'vw', // (String) Expected units.
      selectorBlackList: ['.van'], // (Array) The selectors to ignore and leave as px.
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
      mediaQuery: false // (Boolean) Allow px to be converted in media queries.
    })
  ]
}
