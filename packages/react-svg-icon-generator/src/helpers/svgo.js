import SVGOptim from 'svgo';

const svgo = new SVGOptim({
  plugins: [
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'cleanupAttrs',
    'convertStyleToAttrs',
    {'cleanupIDs': false},
    'removeRasterImages',
    'removeUselessDefs',
    'cleanupNumericValues',
    'cleanupListOfValues',
    'convertColors',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeViewBox',
    'cleanupEnableBackground',
    'removeHiddenElems',
    'removeEmptyText',
    'convertShapeToPath',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    'convertPathData',
    'convertTransform',
    'removeEmptyAttrs',
    'removeEmptyContainers',
    'mergePaths',
    'removeUnusedNS',
    'transformsWithOnePath',
    'sortAttrs',
    'removeTitle',
    'removeDesc',
    'removeDimensions',
    'addClassesToSVGElement',
    'removeStyleElement',
    {
      removeAttrs: {
      },
    },
  ],
});

export default svgo;
