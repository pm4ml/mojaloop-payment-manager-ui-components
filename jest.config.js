module.exports = {
  setupFiles: [
    './test/jestsetup.js', // Ensure this path is correct
  ],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  moduleNameMapper: {
    '^.+\\.(css|scss|png|svg)$': '<rootDir>/src/test/__mocks__/staticMocks.js',
  },
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
  ],
  roots: [
    'src/test',
    'src/reduxFetch',
    'src/reduxValidation',
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!(cheerio|other-module)/)',
    '/node_modules/(?!(fetch-mock|other-module)/)',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transform JS/JSX using Babel
  },
};
