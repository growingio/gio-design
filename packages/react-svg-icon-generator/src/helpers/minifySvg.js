import path from 'path';
import Promise from 'bluebird';
import svgo from './svgo';

export default function minifySvg(file, content) {
  return new Promise(resolve => svgo.optimize(content, result => resolve({
    name: path.basename(file, '.svg'),
    svg: result
  })));
}
