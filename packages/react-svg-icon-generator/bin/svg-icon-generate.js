#! /usr/bin/env node
const path = require('path');
const configureGenerator = require('../lib/configureGenerator');

const argv = require('yargs')
  .default('reactPureRender', true)
  .default('radium', true)
  .default('native', false)
  .default('keepFillColor', false)
  .default('template', path.join(__dirname, '..', 'template', 'icon.nunjucks'))
  .usage('Usage: \n$0 --svgDir [./assets/svgs] --destination [./src/components/Icon.jsx]')
  .demandOption(['svgDir','destination'])
  .argv;

console.log('Running SVG Icon generator with the following options:');
console.log(JSON.stringify(argv, null, 2));

configureGenerator(argv)();
