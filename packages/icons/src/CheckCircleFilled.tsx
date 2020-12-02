import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgCheckCircleFilled(wrapperProps: IconProps) {
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
      <g id="check-circle-filled_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="check-circle-filled_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M5.75 8.26a.19.19 0 00.28 0c.59-.59 2.85-2.84 3.74-3.74a.52.52 0 01.73 0 .51.51 0 010 .72L6.62 9.13l-.34.34a.46.46 0 01-.34.16.47.47 0 01-.36-.13l-.4-.39-1.74-1.74a.52.52 0 010-.72.52.52 0 01.35-.14.5.5 0 01.35.14c.47.47 1.28 1.29 1.61 1.61zM7 0a7 7 0 11-7 7 7 7 0 017-7z"
            fill="currentColor"
            fillRule="evenodd"
            id="check-circle-filled_svg__check-circle"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgCheckCircleFilled;
