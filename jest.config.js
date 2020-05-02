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
    '.+\\.(css|styl)$': 'jest-css-modules-transform',
    '.+\\.tsx?$': 'ts-node'
  },
  testRegex: '/__tests__/.*\\.test\\.tsx?$',
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  bail: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}'
  ],
  setupFiles: [
    '<rootDir>/__tests__/setup.js'
  ]
};
