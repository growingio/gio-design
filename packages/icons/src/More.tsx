import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgMore(wrapperProps: IconProps) {
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
      <path
        className="more_svg__cls-2"
        d="M7 1a1 1 0 11-1 1 1 1 0 011-1zm0 5a1 1 0 11-1 1 1 1 0 011-1zm0 5a1 1 0 11-1 1 1 1 0 011-1z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgMore;
