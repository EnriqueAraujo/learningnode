module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    ['airbnb-base', 'prettier'],
  ],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prttier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    "no-ununsed-vars": ["error", { "argsIgnorePattern": "next"}]
  },
};
