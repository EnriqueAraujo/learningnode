module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins: ['prettier'],
  globals: {
    atomics: 'readonly',
    sharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  ruler: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "camlcase": "off",
    "no-unused-vars": ["error", {"argsIgnorePattern": "next"}]
  },
}
