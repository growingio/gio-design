/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-require-imports */
const pinyinMatch = require('pinyin-match');

export default function isContain(target = '', source = ''): boolean {
  if (!target) {
    target = '';
  }
  if (!source) {
    source = '';
  }
  return !!pinyinMatch.match(target, source);
}
