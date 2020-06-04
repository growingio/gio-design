import configureGenerator from './configureGenerator';
import gulp from 'gulp';

export default function configureSvgIcon(config) {
  gulp.task('svg-icon', configureGenerator(config));
}

export {
  configureGenerator
};
