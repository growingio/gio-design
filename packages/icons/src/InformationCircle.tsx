import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgInformationCircle(wrapperProps: IconProps) {
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
      <g id="information-circle_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="information-circle_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M7 3.5a.75.75 0 11-.75.75A.76.76 0 017 3.5zm.5 6.5a.5.5 0 01-1 0V6a.5.5 0 011 0zM7 1a6 6 0 11-6 6 6 6 0 016-6zm0-1a7 7 0 11-7 7 7 7 0 017-7z"
            fill="currentColor"
            fillRule="evenodd"
            id="information-circle_svg__information-circle"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgInformationCircle;
