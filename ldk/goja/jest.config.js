module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    oliveHelps: {},
  },
  setupFilesAfterEnv: ["<rootDir>/src/jestGlobalSetup.js"]
};
