module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/mustache-interpolation-spacing': 'warning',
    'vue/max-attributes-per-line': 'off',
    'vue/html-indent': 'off'
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: ['plugin:vue/essential', '@vue/prettier']
}
