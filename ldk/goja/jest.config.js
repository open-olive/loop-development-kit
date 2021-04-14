module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    oliveHelps: {},
  },
  setupFilesAfterEnv: ["<rootDir>/jestGlobalSetup.js"]
};
