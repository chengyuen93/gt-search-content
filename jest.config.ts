import type { JestConfigWithTsJest } from 'ts-jest';
import { defaults as tsjPreset } from 'ts-jest/presets';

const jestConfig: JestConfigWithTsJest = {
  ...tsjPreset,
  transform: {
    '^.+\\.jsx$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testTimeout: 30000,
  maxWorkers: 1,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__data__/',
    '/coverage',
    'package.json',
    'package-lock.json',
    'reportWebVitals.ts',
    'setupTests.ts',
    'index.(ts|tsx)',
    '/*.d.ts',
    '/types/',
    '/constants/',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileMock.ts',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/setupTests.ts'],
};

export default jestConfig;
