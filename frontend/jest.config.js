require('jest-preset-angular/ngcc-jest-processor');
require('jest-sonar-reporter')

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  collectCoverage: true,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  testPathIgnorePatterns: [
    '/build',
      'src/app/global',
    'src/app/ingredient',
    'src/app/layout',
    'src/app/recipe',
    'src/app/views',

  ],
  testResultsProcessor: 'jest-sonar-reporter'
  /*,
  coverageThreshold: {
    './src/app': {
        //defines the coverage
        'branches':0
    }
  }*/
};