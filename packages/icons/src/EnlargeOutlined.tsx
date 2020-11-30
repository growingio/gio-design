import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgEnlargeOutlined(wrapperProps: IconProps) {
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
        d="M10.481 11.188a1.019 1.019 0 00-1.282-.128c-.921.6-2.021.94-3.199.94-3.312 0-6-2.688-6-6 0-3.311 2.688-6 6-6 3.311 0 6 2.689 6 6a5.965 5.965 0 01-.93 3.207c-.264.398-.211.927.127 1.265.938.956 2.656 2.675 2.656 2.675a.5.5 0 01-.707.707l-2.665-2.666zM6 1c2.759 0 5 2.241 5 5 0 2.76-2.241 5-5 5-2.76 0-5-2.24-5-5 0-2.759 2.24-5 5-5zm.5 4.3c0 .053.021.104.058.142A.204.204 0 006.7 5.5h1.8a.5.5 0 010 1H6.7a.2.2 0 00-.2.2v1.8a.5.5 0 11-1 0V6.7a.198.198 0 00-.059-.141A.197.197 0 005.3 6.5H3.5a.5.5 0 110-1h1.8a.2.2 0 00.2-.2V3.5a.5.5 0 011 0v1.8z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgEnlargeOutlined;
