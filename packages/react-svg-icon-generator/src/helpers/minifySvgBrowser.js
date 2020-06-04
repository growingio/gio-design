import path from 'path';
import Promise from 'bluebird';
import SVGO from './svgoBrowser';

const svgo = new SVGO();

export default function minifySvg(file, content) {
  return new Promise(resolve => svgo.optimize(content, result => resolve({
    filename: file,
    name: path.basename(file, '.svg'),
    svg: result
  })));
}
