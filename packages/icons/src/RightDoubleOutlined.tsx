import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgRightDoubleOutlined(wrapperProps: IconProps) {
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
      <g id="right-double-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="right-double-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M6.66 6.29l.34.36a.48.48 0 010 .7l-.35.36-4.59 4.59a.5.5 0 01-.71 0 .5.5 0 010-.7l4.46-4.46a.19.19 0 000-.28L1.34 2.39a.48.48 0 010-.68.51.51 0 01.72 0zm5.63 0l.36.36a.51.51 0 010 .7l-.36.36L7.7 12.3a.5.5 0 01-.71 0H7a.48.48 0 010-.7l4.45-4.46a.19.19 0 000-.28L7 2.39a.48.48 0 010-.68.52.52 0 01.73 0z"
            fill="currentColor"
            fillRule="evenodd"
            id="right-double-outlined_svg__left-double"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgRightDoubleOutlined;
