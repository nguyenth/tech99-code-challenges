import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  testMatch: ['**/tests/**/*.test.ts'],
  verbose: true,
  transform: {
    '.+\.test\.ts$': ['ts-jest', { tsconfig: 'tsconfig-jest.json' }]
  }
};

export default config;