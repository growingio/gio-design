import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgCheckOutlined(wrapperProps: IconProps) {
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
      <g id="check-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="check-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M5.76 10.9l-.35.35a.5.5 0 01-.71 0l-.37-.37L.81 7.36a.51.51 0 010-.7.49.49 0 01.36-.15.47.47 0 01.35.15L4.89 10a.19.19 0 00.28 0l7.28-7.27a.48.48 0 01.36-.15.51.51 0 01.37.15.53.53 0 01.15.36.56.56 0 01-.15.37z"
            fill="currentColor"
            fillRule="evenodd"
            id="check-outlined_svg__check"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgCheckOutlined;
