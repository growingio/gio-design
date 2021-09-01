module.exports = {
  // if you're also using typescript
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
  verbose: true,
  // registers babel.config.js with jest
  transform: {
    '^.+\\.js(x)?$': 'babel-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
  },

  // explicitly include any node libs using ESM modules
  // "node_modules/?!(<ESM module here>|<another here>|<etc...>)"
  // transformIgnorePatterns: ['node_modules/?!(@gio-design\/icon)', '!(@gio-design/icon)'],
  transformIgnorePatterns: ['node_modules/@storybook/(?!(addon-docs)/)'],

  // setupFilesAfterEnv: ['<rootDir>/enzyme-adapter.js'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup'],

  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    'iconfont.js': '<rootDir>/__mocks__/iconMock.js',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{ts,tsx}',
    '!src/**/interface?(s).ts?(x)',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/demos/*',
    '!src/**/__test?(s)__/*',
    '!src/text/Text.tsx',
    '!src/typograhy/Text.tsx',
  ],
  coverageDirectory: './coverage/',
  coveragePathIgnorePatterns: ['list-pro/'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/es/', '/build/', '/dist/'],
};
