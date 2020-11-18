module.exports = {
  // if you're also using typescript
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  // registers babel.config.js with jest
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
  },

  // explicitly include any node libs using ESM modules
  // "node_modules/?!(<ESM module here>|<another here>|<etc...>)"
  // transformIgnorePatterns: ['node_modules/?!(@gio-design\/icon)', '!(@gio-design/icon)'],
  transformIgnorePatterns: ['/node_modules/(?!@gio-design/icon).+\\.js$'],

  setupFilesAfterEnv: ['<rootDir>/enzyme-adapter.js'],

  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    'iconfont.js': '<rootDir>/__mocks__/iconMock.js',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/index.{ts,tsx}',
    '!src/**/interfaces.ts',
    '!src/**/*.stories.{ts,tsx}',
  ],
  coverageDirectory: './coverage/',
};
