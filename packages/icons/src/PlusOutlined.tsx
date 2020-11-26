import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgPlusOutlined(wrapperProps: IconProps) {
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="currentColor" {...props}>
      <defs>
        <style />
      </defs>
      <g id="plus-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="plus-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M6 6.51A.54.54 0 006.51 6V.49a.49.49 0 011 0V6a.54.54 0 00.49.51h5.48a.49.49 0 010 1H8a.54.54 0 00-.51.49v5.48a.49.49 0 01-1 0V8A.54.54 0 006 7.49H.49a.49.49 0 010-1z"
            fill="currentColor"
            fillRule="evenodd"
            id="plus-outlined_svg__plus"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgPlusOutlined;
