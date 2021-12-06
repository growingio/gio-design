module.exports = {
  addons: [
    // addons on top
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    '@storybook/addon-toolbars',
    '@storybook/addon-backgrounds',
    // addons on right side
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    'storybook-addon-designs',
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
  ],
  features: {
    postcss: false,
  },
  staticDirs: ['../public'],
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
    });
    return config;
  },
};
