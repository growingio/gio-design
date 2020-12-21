import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgCleanOutlined(wrapperProps: IconProps) {
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
    <svg
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      fill="currentColor"
      {...props}
    >
      <path
        d="M9.5 4.5c0 .133.053.26.146.354A.504.504 0 0010 5h3a1 1 0 011 1v7a1 1 0 01-1 1H1a1 1 0 01-1-1V6a1 1 0 011-1h3c.133 0 .26-.053.354-.146A.504.504 0 004.5 4.5V1a.997.997 0 011-1h3a.997.997 0 011 1v3.5zm3.5 5a.504.504 0 00-.146-.354A.504.504 0 0012.5 9h-11a.504.504 0 00-.354.146A.504.504 0 001 9.5v3c0 .133.053.26.146.354A.504.504 0 001.5 13h1.3a.2.2 0 00.2-.2v-1.3c0-.133.053-.26.146-.354a.504.504 0 01.708 0A.504.504 0 014 11.5v1.3c0 .11.09.2.2.2h2.1a.2.2 0 00.2-.2v-2.3c0-.133.053-.26.146-.354a.504.504 0 01.708 0 .504.504 0 01.146.354v2.3c0 .11.09.2.2.2h2.1a.2.2 0 00.2-.2v-1.3c0-.133.053-.26.146-.354a.504.504 0 01.708 0A.504.504 0 0111 11.5v1.3c0 .11.09.2.2.2h1.3c.133 0 .26-.053.354-.146A.504.504 0 0013 12.5v-3zm0-3a.504.504 0 00-.146-.354A.504.504 0 0012.5 6h-11a.504.504 0 00-.354.146A.504.504 0 001 6.5v1c0 .133.053.26.146.354A.504.504 0 001.5 8h11c.133 0 .26-.053.354-.146A.504.504 0 0013 7.5v-1zM6 1a.504.504 0 00-.354.146.504.504 0 00-.146.354v3c0 .133.053.26.146.354A.504.504 0 006 5h2c.133 0 .26-.053.354-.146A.504.504 0 008.5 4.5v-3a.504.504 0 00-.146-.354A.504.504 0 008 1H6z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgCleanOutlined;
