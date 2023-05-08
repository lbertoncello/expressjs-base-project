module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': [ 'error', 'only-multiline' ],
    semi: [ 'error', 'always', { omitLastInOneLineBlock: true } ],
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ]
  }
};
