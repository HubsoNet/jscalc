module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-use-before-define': ['warn', {
      functions: false,
      classes: false,
      variables: true,
      allowNamedExports: false,
    }],
  },
};
