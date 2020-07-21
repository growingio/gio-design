const _ = require('lodash');
const fs = require('fs');
const StyleDictionary = require('style-dictionary').extend('./config.json');
const typingsES6Template = _.template(fs.readFileSync(`${__dirname}/templates/typings/es6.template`));

StyleDictionary.registerFormat({
  name: 'typings/es6',
  formatter: typingsES6Template,
});

StyleDictionary.buildAllPlatforms();
