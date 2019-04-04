module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:jest/recommended',
  ],
  plugins: [
    'react',
    'jest'
  ],
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
  },
};
