const _ = require('lodash');
const fs = require('fs');
const StyleDictionary = require('style-dictionary').extend('./config.json');
const typingsES6Template = _.template(fs.readFileSync(`${__dirname}/templates/typings/es6.template`));

StyleDictionary.registerFormat({
  name: 'typings/es6',
  formatter: typingsES6Template,
});

StyleDictionary.registerTransform({
  name: 'supportCompositeValue',
  type: 'value',
  matcher: (prop) => prop.attributes.type === 'shadow' || 'background',
  transformer: (prop) => prop.original.value,
});

StyleDictionary.registerTransformGroup({
  name: 'less',
  transforms: [
    'attribute/cti',
    'name/cti/kebab',
    'time/seconds',
    'content/icon',
    'size/rem',
    'color/hex8',
    'supportCompositeValue',
  ],
});

StyleDictionary.buildAllPlatforms();
