import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgPlusCircleFilled(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    style: {
      color,
      width: !size ? '16px' : size,
      height: !size ? '16px' : size,
    },
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
  };
  const file = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="currentColor" {...props}>
      <defs>
        <style />
      </defs>
      <g id="plus-circle-filled_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="plus-circle-filled_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M7.7 6.5a.2.2 0 01-.2-.2V3.5A.51.51 0 007 3a.51.51 0 00-.5.5v2.8a.2.2 0 01-.2.2H3.5A.51.51 0 003 7a.51.51 0 00.5.5h2.8a.2.2 0 01.2.2v2.8a.51.51 0 00.5.5.51.51 0 00.5-.5V7.7a.2.2 0 01.2-.2h2.8A.51.51 0 0011 7a.51.51 0 00-.5-.5zM7 0a7 7 0 11-7 7 7 7 0 017-7z"
            fill="currentColor"
            fillRule="evenodd"
            id="plus-circle-filled_svg__plus-circle"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgPlusCircleFilled;
