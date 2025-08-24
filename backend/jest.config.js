module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/*.test.js'],
  setupFilesAfterEnv: ['./tests/setup.js'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
};