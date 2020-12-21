import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgWarningCircle(wrapperProps: IconProps) {
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
      <g id="warning-circle_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="warning-circle_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M8 3.55a.56.56 0 00-.13-.39.52.52 0 00-.42-.16h-.9a.52.52 0 00-.37.16.56.56 0 00-.13.39c.12 1.11.36 3.58.43 4.27a.2.2 0 00.2.18h.64a.2.2 0 00.2-.18c.07-.69.31-3.16.48-4.27zM7 9a1 1 0 11-1 1 1 1 0 011-1zm0-8a6 6 0 11-6 6 6 6 0 016-6zm0-1a7 7 0 11-7 7 7 7 0 017-7z"
            fill="currentColor"
            fillRule="evenodd"
            id="warning-circle_svg__warning-circle"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgWarningCircle;
