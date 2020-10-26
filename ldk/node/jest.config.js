module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/proto/**',
    '!**/node_modules/**',
  ],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
};
