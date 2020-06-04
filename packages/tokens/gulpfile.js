const { src, dest } = require('gulp');
const yaml = require('gulp-yaml');

const yaml2json = () =>
  src('src/**/*.yml')
  .pipe(yaml())
  .pipe(dest('tmp'))

exports.default = yaml2json
