import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgCopyOutlined(wrapperProps: IconProps) {
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
        d="M10 2.5a.5.5 0 01-.5.5.5.5 0 01-.5-.5v-1a.47.47 0 00-.15-.35A.47.47 0 008.5 1h-7a.5.5 0 00-.5.5v7a.47.47 0 00.15.35.47.47 0 00.35.15h1a.5.5 0 010 1H1a1 1 0 01-1-1V1a1 1 0 011-1h8a1 1 0 011 1zm3 3a.5.5 0 00-.5-.5h-7a.5.5 0 00-.5.5v7a.5.5 0 00.5.5h7a.5.5 0 00.5-.5zm1 7.5a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h8a1 1 0 011 1z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgCopyOutlined;
