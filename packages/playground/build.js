var themes = require('@gio-design/themes');
var fs = require('fs');

var out = JSON.stringify({
  modifyVars: themes.indigo
});

fs.writeFileSync('./.lessrc', out, 'utf8');
