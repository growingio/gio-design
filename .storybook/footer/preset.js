module.exports = {
  managerWebpack: async (config, options) => {
    // update config here
    return {
      ...config,
      entry: [...config.entry, require.resolve('./index')],
    };
  },
  managerBabel: async (config, options) => {
    // update config here
    return config;
  },
  webpackFinal: async (config, options) => {
    return config;
  },
  babel: async (config, options) => {
    return config;
  },
};
