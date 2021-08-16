module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    oliveHelps: {},
  },
  testMatch: ['**/*.test.(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/src/jestGlobalSetup.js'],
  silent: false,
};
