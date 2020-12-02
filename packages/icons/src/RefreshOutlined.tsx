import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgRefreshOutlined(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    style: {
      color,
    },
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '16px' : size,
    height: !size ? '16px' : size,
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
        d="M2.609 8.282a.2.2 0 01-.17.306h-.298a.097.097 0 00-.075.033.101.101 0 00-.025.078c.355 2.99 2.889 5.3 5.959 5.3a5.98 5.98 0 004.94-2.602.494.494 0 01.662-.157c.006-.002.01 0 .014.003a.503.503 0 01.169.708A7.02 7.02 0 018 15a7 7 0 01-6.967-6.322.1.1 0 00-.099-.09H.661a.2.2 0 01-.17-.306l.889-1.423a.202.202 0 01.17-.094c.069 0 .133.036.17.094l.889 1.423zm12.73-.87a.2.2 0 01.17.306L14.62 9.14a.202.202 0 01-.17.094.202.202 0 01-.17-.094l-.889-1.423a.2.2 0 01.17-.306h.298a.097.097 0 00.075-.033.096.096 0 00.025-.078A6.006 6.006 0 008 2a5.98 5.98 0 00-4.94 2.603.494.494 0 01-.662.157c-.006.002-.01 0-.014-.003a.503.503 0 01-.169-.708A7.02 7.02 0 018 .999a7.002 7.002 0 016.967 6.323.1.1 0 00.099.09h.273z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgRefreshOutlined;
