import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgLoadingBlackOutlined(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    color,
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    <svg viewBox="0 0 14 14" fill="currentColor" {...props}>
      <g data-name="Layer 2">
        <g fill="#2f3c70" data-name="Layer 1">
          <path d="M7 0a7 7 0 107 7 7 7 0 00-7-7zm0 13a6 6 0 116-6 6 6 0 01-6 6z" opacity={0.4} fill="currentColor" />
          <path
            d="M.5 7.5A.5.5 0 010 7a7 7 0 017-7 .5.5 0 01.5.5.5.5 0 01-.5.5 6 6 0 00-6 6 .5.5 0 01-.5.5z"
            fill="currentColor"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgLoadingBlackOutlined;
