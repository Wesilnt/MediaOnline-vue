module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 750, // (Number) The width of the viewport.
      viewportHeight: 1334, // (Number) The height of the viewport.
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
      viewportUnit: 'vw', // (String) Expected units.
      selectorBlackList: ['.van'], // (Array) The selectors to ignore and leave as px.
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
      ediaQuery: false // (Boolean) Allow px to be converted in media queries.
    },
    autoprefixer: {},
    /*'postcss-pxtorem': {
      remUnit: 75,
      rootValue: 16,
      selectorBlackList: ['van-'],
      // minPixelValue: 6,
      // remPrecision:8,
      propList: ['*']
    }*/
  }
}
