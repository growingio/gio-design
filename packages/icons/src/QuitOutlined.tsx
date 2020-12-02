import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgQuitOutlined(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    style: {
      color,
    },
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '16px' : size,
    height: !size ? '16px' : size,
  };
  const file = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
      <defs>
        <style />
      </defs>
      <g id="quit-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="quit-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M8.58 6.2a.58.58 0 11-1.15 0V1.59a.58.58 0 111.15 0zm2.11-2.46a.58.58 0 01-.31-.48.56.56 0 01.27-.51.53.53 0 01.57 0 7 7 0 11-10 7.91 7 7 0 013.57-7.94.57.57 0 01.53 1 5.87 5.87 0 108.37 6.62 5.91 5.91 0 00-3-6.6z"
            fill="currentColor"
            fillRule="evenodd"
            id="quit-outlined_svg__quit"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgQuitOutlined;
