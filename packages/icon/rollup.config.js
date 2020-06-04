const babel = require('rollup-plugin-babel');

module.exports = {
  input: 'index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs'
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    })
  ],
  external: ['react', 'prop-types', 'radium']
};