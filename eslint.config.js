module.exports = {
  parser: '@babel/eslint-parser',  // Correct usage as a string
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    requireConfigFile: false,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: [
    'react',
    'jest',
    'import',
    'jsx-a11y',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jest/recommended',
    'prettier',
  ],
  rules: {
    ...require('eslint-config-airbnb-base').rules,
    ...require('eslint-config-prettier').rules,

    // Custom rules
    'react/jsx-key': 'off', 
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    'react/destructuring-assignment': 'off',
    'no-unused-vars': 'off',
    'react/display-name': 'off',
    'import/namespace': 'off',  
    'max-len': 'off',
    'sort-imports': 'off',
    'import/order': 'off',
    'import/first': 'off',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-underscore-dangle': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'react/prefer-stateless-function': ['warn', { ignorePureComponents: true }],
    'react/prop-types': 'off',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'react/no-multi-comp': 'off',
    'react/no-did-update-set-state': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/tabindex-no-positive': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['*', '/'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: false,
      },
    ],
  },
};
