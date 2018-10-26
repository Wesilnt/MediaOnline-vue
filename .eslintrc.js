module.exports = {
  root: true,

  env: {
    node: true,
    es6: true
  },

  rules: {
    'no-console': 0,
    'no-useless-escape': 0,
    'no-multiple-empty-lines': [
      2,
      {
        max: 3
      }
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        insertPragma: true,
        requirePragma: false
      }
    ]
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: [
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    'eslint:recommended'
  ]
}
