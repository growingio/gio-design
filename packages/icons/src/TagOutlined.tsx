import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgTagOutlined(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    color,
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    <svg
      viewBox="0 0 16 16"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      fill="currentColor"
      {...props}
    >
      <path
        d="M7.31.406a1.38 1.38 0 00-.976-.404H1.382a1.38 1.38 0 00-1.38 1.38v4.952c0 .367.144.718.404.978l8.285 8.285c.54.54 1.414.54 1.954 0l4.952-4.952a1.38 1.38 0 000-1.953L7.31.406zm-1.548.976c.367 0 .718.147.977.405 1.379 1.38 5.894 5.895 7.394 7.393.27.27.27.708 0 .977l-3.976 3.976a.691.691 0 01-.978 0c-1.498-1.5-6.013-6.015-7.393-7.393a1.385 1.385 0 01-.404-.977v-3.69c0-.38.31-.69.691-.69h3.69z"
        fill="currentColor"
      />
      <path
        d="M5.144 3.43a1.715 1.715 0 11-.001 3.43 1.715 1.715 0 01.001-3.43zm0 1.143a.573.573 0 00-.571.572c0 .314.257.571.571.571a.573.573 0 00.571-.571.573.573 0 00-.57-.572z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgTagOutlined;
