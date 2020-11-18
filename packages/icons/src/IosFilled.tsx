import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgIosFilled(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    style: {
      color,
    },
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="currentColor" {...props}>
      <defs>
        <style />
      </defs>
      <g id="ios-filled_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="ios-filled_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M9 2.43a2.58 2.58 0 01-2 1 2.82 2.82 0 01.7-2.16 3 3 0 012-1A3 3 0 019 2.43m3.52 7.71a7.26 7.26 0 01-1 1.93c-.53.82-1.12 1.68-2 1.68s-1.2-.56-2.22-.56-1.38.56-2.23.56-1.58-.89-2.15-1.75c-1.16-1.67-2-4.74-.86-6.76a3.33 3.33 0 012.8-1.7c.87 0 1.7.59 2.22.59s1.54-.73 2.59-.61a3.16 3.16 0 012.43 1.33 3.09 3.09 0 00-1.41 2.57 2.94 2.94 0 001.81 2.72"
            fill="currentColor"
            id="ios-filled_svg__ios"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgIosFilled;
