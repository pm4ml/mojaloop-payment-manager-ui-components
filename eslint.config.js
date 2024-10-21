const react = require('eslint-plugin-react');
const jest = require('eslint-plugin-jest');
const importPlugin = require('eslint-plugin-import');
const airbnbBase = require('eslint-config-airbnb-base');
const prettier = require('eslint-config-prettier');
const jsxA11y = require('eslint-plugin-jsx-a11y'); // Import the JSX accessibility plugin
const babelParser = require('@babel/eslint-parser'); // Import Babel parser

module.exports = [
  {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
      },
    },
    plugins: {
      react,
      jest,
      import: importPlugin,
      'jsx-a11y': jsxA11y, // Add jsx-a11y to the plugins
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...airbnbBase.rules,
      ...prettier.rules,

      // Custom rules
      'jsx-a11y/click-events-have-key-events': 'error', // Enable the a11y rule
      'max-len': 'off',
      'sort-imports': 'off',
      'import/order': 'off',
      'import/first': 'off',
      'quotes': ['error', 'single', { allowTemplateLiterals: true }],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'react/destructuring-assignment': ['warn', 'always'],
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
  },
];
