const fs = require('fs');

const categories = fs.readdirSync('./assets');
const icons = categories.reduce((icons, category) => {
  const files = fs.readdirSync(`./assets/${category}`);
  const list = files.map(file => file.replace(/\.svg/g, ''));
  return { ...icons, [category]: list };
}, {});

console.log(icons);
const out = JSON.stringify(icons);
const dest = './dist/icons.json';
console.log(`generate icon name list: ${dest}`);
fs.writeFileSync(dest, out, 'utf8');
