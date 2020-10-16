import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgEventOutlined(wrapperProps: IconProps) {
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
        d="M1 16a1 1 0 01-1-1V1a1 1 0 011-1h9a1 1 0 011 1v4h4a1 1 0 011 1v9a1 1 0 01-1 1H1zM9 1H2a1 1 0 00-.993.883L1 2v12a1 1 0 00.883.993L2 15h7a1 1 0 00.993-.883L10 14V2a1 1 0 00-1-1zm5 5h-2.8a.2.2 0 00-.193.147L11 6.2v8.6a.2.2 0 00.147.193L11.2 15H14a1 1 0 00.993-.883L15 14V7a1 1 0 00-1-1zm-5.5 6a.5.5 0 010 1h-6a.5.5 0 010-1h6zm0-3a.5.5 0 010 1h-6a.5.5 0 010-1h6zm0-6a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-6a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5h6zm-1 1h-4a.5.5 0 00-.492.41L3 4.5v1a.5.5 0 00.41.492L3.5 6h4a.5.5 0 00.492-.41L8 5.5v-1a.5.5 0 00-.5-.5z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgEventOutlined;
