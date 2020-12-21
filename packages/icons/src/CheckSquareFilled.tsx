import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgCheckSquareFilled(wrapperProps: IconProps) {
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
      <g data-name="\u56FE\u5C42 2">
        <path
          d="M5.74 8.25a.2.2 0 00.3 0l3.73-3.73a.52.52 0 01.73 0 .51.51 0 010 .72L6.62 9.13l-.34.34a.46.46 0 01-.34.16.47.47 0 01-.36-.13l-.4-.39-1.74-1.74a.52.52 0 010-.72.52.52 0 01.35-.14.5.5 0 01.35.14zM13 0a1 1 0 011 1v12a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1z"
          fill="currentColor"
          fillRule="evenodd"
          data-name="\u56FE\u5C42 1"
        />
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgCheckSquareFilled;
