module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    oliveHelps: {},
  },
  testMatch: [
    '**/*.test.(ts)'
  ],
  setupFilesAfterEnv: ["<rootDir>/src/jestGlobalSetup.js"]
};
