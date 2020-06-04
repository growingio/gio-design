const fs = require('fs');
const { src, dest, parallel, series } = require('gulp');
const yaml = require('gulp-yaml');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const merge = require('gulp-merge-json');
const handlebars = require('handlebars');

function less() {
  return src('src/*.yml')
    .pipe(yaml())
    .pipe(replace(/"(\S*":)/, '"@$1'))
    .pipe(rename({ suffix: '-less' }))
    .pipe(dest('lib'))
}

function json() {
  return src('src/*.yml')
    .pipe(yaml())
    .pipe(replace(/-\w/g, m => m.toUpperCase().replace(/-/, '')))
    .pipe(dest('.tmp'))
}

function build(done) {
  const files = fs.readdirSync('.tmp');
  const themeMap = files.reduce((themeMap, file) => {
    const [themeName, ext] = file.split('.');
    if (ext === 'json' && !/-less$/.test(themeName)) {
      const json = fs.readFileSync('.tmp/' + file, 'utf-8');
      themeMap[themeName] = JSON.parse(json);
    }
    return themeMap;
  }, {});

  const themes = Object.keys(themeMap);
  themes.forEach(theme => {
    src(['node_modules/@gio-design/tokens/dist/*.json', `.tmp/${theme}.json`])
    .pipe(replace(/-\w/g, m => m.toUpperCase().replace(/-/, '')))
    .pipe(merge({ fileName: theme + '.json' }))
    .pipe(dest('lib'))
  })
  const templateFile = fs.readFileSync('src/index.js.hbs', 'utf-8');
  const template = handlebars.compile(templateFile);
  fs.writeFileSync('lib/index.js', template({ themes }));

  const originJson = fs.readFileSync('.tmp/origin.json', 'utf-8');
  const origin = JSON.parse(originJson);
  const props = Object.keys(origin);
  const dtsTemplateFile = fs.readFileSync('src/index.d.ts.hbs', 'utf-8');
  const dtsTemplate = handlebars.compile(dtsTemplateFile);
  fs.writeFileSync('lib/index.d.ts', dtsTemplate({ themes, props }));

  done();
}

exports.default = series(less, json, build);