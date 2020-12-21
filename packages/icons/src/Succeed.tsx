import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgSucceed(wrapperProps: IconProps) {
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
      <g id="succeed_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="succeed_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <g id="succeed_svg__succeed" fill="#323333">
            <path
              d="M7 1a6 6 0 11-6 6 6 6 0 016-6zm0-1a7 7 0 11-7 7 7 7 0 017-7z"
              fillRule="evenodd"
              fill="currentColor"
            />
            <path
              d="M6.68 9a.49.49 0 01-.36.15A.47.47 0 016 9L4.41 7.42a.5.5 0 010-.71.5.5 0 01.7 0l1.21 1.21L9.1 5.15a.5.5 0 01.71 0 .5.5 0 010 .7z"
              fill="currentColor"
            />
          </g>
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgSucceed;
