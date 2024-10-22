const babelParser = require('@babel/eslint-parser');
const eslintConfigAirbnbBase = require('eslint-config-airbnb-base');
const eslintConfigPrettier = require('eslint-config-prettier');
const reactPlugin = require('eslint-plugin-react');
const jestPlugin = require('eslint-plugin-jest');
const importPlugin = require('eslint-plugin-import');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');

module.exports = [
  {
    files: ['**/*.js', '**/*.jsx'], // Apply to JavaScript and JSX files
    languageOptions: {
      parser: babelParser, // Set Babel as the parser
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
        requireConfigFile: false,
      },
      globals: {
        // Define global variables if needed (e.g., jest, window, document)
      },
    },
    plugins: {
      react: reactPlugin,
      jest: jestPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      ...eslintConfigAirbnbBase.rules, // Include Airbnb base rules
      ...eslintConfigPrettier.rules, // Include Prettier rules

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
  },
];
