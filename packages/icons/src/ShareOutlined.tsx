import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgShareOutlined(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    color,
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    <svg viewBox="0 0 14 14" fill="currentColor" {...props}>
      <path
        d="M11.51 1A1.5 1.5 0 1110 2.5 1.5 1.5 0 0111.51 1zm-9 4.5A1.5 1.5 0 111 7a1.5 1.5 0 011.5-1.5zm9 4.5A1.5 1.5 0 1110 11.5a1.5 1.5 0 011.51-1.5zM8.79 3.4A.52.52 0 009 2.87a2.22 2.22 0 010-.37 2.5 2.5 0 11.84 1.87.48.48 0 00-.6-.07c-.89.5-3.27 1.87-4 2.31A.47.47 0 005 7a.47.47 0 00.22.39l4 2.32a.5.5 0 00.6-.07A2.45 2.45 0 0111.51 9 2.5 2.5 0 119 11.5a2.22 2.22 0 010-.37.51.51 0 00-.25-.52l-3.7-2.17a.48.48 0 00-.62.13 2.45 2.45 0 01-1.93.93 2.5 2.5 0 111.94-4.07.48.48 0 00.6.12C5.9 5.07 8 3.86 8.79 3.4z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgShareOutlined;
