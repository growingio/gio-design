import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgClose(wrapperProps: IconProps) {
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
      <g id="close_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="close_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M6.62 5.92a.54.54 0 00.76 0l3.87-3.87a.49.49 0 01.7.7L8.08 6.62a.54.54 0 000 .76L12 11.25a.49.49 0 01-.7.7L7.38 8.08a.54.54 0 00-.76 0L2.75 12a.49.49 0 01-.7-.7l3.87-3.92a.54.54 0 000-.76L2.05 2.75a.49.49 0 01.7-.7z"
            fill="currentColor"
            fillRule="evenodd"
            id="close_svg__close"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgClose;
