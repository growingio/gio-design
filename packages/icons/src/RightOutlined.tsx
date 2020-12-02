import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgRightOutlined(wrapperProps: IconProps) {
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
      <g id="right-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="right-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M9.48 6.29l.35.35A.53.53 0 0110 7a.51.51 0 01-.15.35l-.35.35-4.6 4.6a.5.5 0 01-.71 0 .51.51 0 010-.71l4.44-4.45A.2.2 0 008.69 7a.17.17 0 00-.06-.14L4.17 2.39a.47.47 0 010-.69.51.51 0 01.72 0z"
            fill="currentColor"
            fillRule="evenodd"
            id="right-outlined_svg__right"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgRightOutlined;
