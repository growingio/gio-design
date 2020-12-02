import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgUpFilled(wrapperProps: IconProps) {
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
      <g id="up-filled_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="up-filled_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M6.61 4.49a.5.5 0 01.78 0l3 3.7a.51.51 0 01.06.53A.5.5 0 0110 9H4a.5.5 0 01-.45-.28.51.51 0 01.06-.53z"
            fill="currentColor"
            fillRule="evenodd"
            id="up-filled_svg__up-2"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgUpFilled;
