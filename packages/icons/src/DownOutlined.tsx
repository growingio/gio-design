import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgDownOutlined(wrapperProps: IconProps) {
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
      <g id="down-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="down-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M7.7 9.48l-.35.35A.51.51 0 017 10a.53.53 0 01-.36-.15l-.35-.35-4.6-4.6a.51.51 0 010-.71.51.51 0 01.71 0l4.46 4.44a.2.2 0 00.14.06.25.25 0 00.14-.06l4.45-4.45a.51.51 0 01.72 0 .49.49 0 010 .69z"
            fill="currentColor"
            fillRule="evenodd"
            id="down-outlined_svg__down"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgDownOutlined;
