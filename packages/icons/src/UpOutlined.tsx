import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgUpOutlined(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    color,
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    <svg viewBox="0 0 14 14" fill="currentColor" {...props}>
      <defs>
        <style />
      </defs>
      <g id="up-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="up-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M6.29 4.52l.35-.35A.53.53 0 017 4a.51.51 0 01.35.15l.35.35 4.6 4.6a.5.5 0 010 .71.51.51 0 01-.71 0L7.14 5.37A.2.2 0 007 5.31a.17.17 0 00-.14.06L2.39 9.83a.47.47 0 01-.69 0 .51.51 0 010-.72z"
            fill="currentColor"
            fillRule="evenodd"
            id="up-outlined_svg__up"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgUpOutlined;
