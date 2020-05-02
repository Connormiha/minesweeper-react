module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'styl',
    'css',
    'flow'
  ],
  transform: {
    '.+\\.(css|styl)$': '<rootDir>/__tests__/preprocessor-stylus.js',
    '.+\\.jsx?$': 'babel-jest'
  },
  testRegex: '/__tests__/.*\\.spec\\.jsx?$',
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  bail: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}'
  ],
  setupFiles: [
    '<rootDir>/__tests__/setup.js'
  ]
};
