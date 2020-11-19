import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgDesktopFilled(wrapperProps: IconProps) {
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
      <g id="desktop-filled_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="desktop-filled_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M2 3a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v6a.5.5 0 01-.5.5h-9A.5.5 0 012 9zm10.5-.5A.5.5 0 0012 2H2a.5.5 0 00-.5.5v7a.5.5 0 00.5.5h10a.5.5 0 00.5-.5zM4 12.5a.5.5 0 01.5-.5h1.8a.21.21 0 00.2-.2v-.6a.2.2 0 00-.2-.2H1.5a1 1 0 01-1-1V2a1 1 0 011-1h11a1 1 0 011 1v8a1 1 0 01-1 1H7.7a.2.2 0 00-.2.2v.6a.21.21 0 00.2.2h1.8a.5.5 0 01.5.5.51.51 0 01-.5.5h-5a.51.51 0 01-.5-.5z"
            fill="currentColor"
            fillRule="evenodd"
            id="desktop-filled_svg__desktop"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgDesktopFilled;
