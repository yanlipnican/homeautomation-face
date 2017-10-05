// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    indent: [1, 4],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // warn about unused variables, rather than erroring
    'no-unused-vars': 1,
    "object-shorthand": 0,
    // modification to the airbnb according to vuejs coding convention
    'func-names': 0,
    'no-shadow': 0,
    'no-mixed-operators': 0,
    'no-param-reassign':0,
    'no-trailing-spaces': 0,
    'object-curly-spacing': 0,
    'comma-dangle': 0,
    'no-underscore-dangle': 0,
    'max-len': 1,
  }
}
