import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgFileOutlined(wrapperProps: IconProps) {
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
    <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      fill="currentColor"
      {...props}
    >
      <path
        d="M6.114.5c.354 0 .693.144.943.4l1.886 1.928c.25.256.589.4.943.4h4.781c.353 0 .692.143.942.4.25.254.391.601.391.963v9.545c0 .362-.141.71-.391.965a1.32 1.32 0 01-.942.4H1.333C.597 15.5 0 14.89 0 14.135V1.864C0 1.11.597.5 1.333.5h4.781zM14.4 14.136a.27.27 0 00.267-.272v-5.59A.27.27 0 0014.4 8H1.6a.27.27 0 00-.267.273v5.591c0 .15.12.272.267.272h12.8zM9.334 4.591c-.354 0-.693-.144-.943-.4-.505-.516-1.381-1.41-1.886-1.928a1.317 1.317 0 00-.943-.399H1.6a.27.27 0 00-.267.272v4.228c0 .15.12.272.267.272h12.8a.26.26 0 00.189-.08.274.274 0 00.078-.192v-1.5a.275.275 0 00-.078-.193.265.265 0 00-.189-.08H9.334z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgFileOutlined;
