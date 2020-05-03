module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
    'json',
    'styl',
    'css'
  ],
  transform: {
    '.+\\.(css|styl)$': 'jest-css-modules-transform',
    '.+\\.tsx?$': 'ts-jest'
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
    '<rootDir>/__tests__/setup.ts'
  ]
};
