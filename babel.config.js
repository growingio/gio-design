module.exports = {
  presets: ['@babel/preset-react', ['@babel/preset-env'], '@babel/preset-typescript'],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    '@babel/plugin-transform-modules-commonjs',
    '@babel/transform-runtime',
  ],
};
