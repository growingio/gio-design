import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgStartFilled(wrapperProps: IconProps) {
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
        d="M7 0a7 7 0 110 14A7 7 0 017 0zM6 4.087a.5.5 0 00-.5.5v4.826a.501.501 0 00.807.395l3.104-2.413a.5.5 0 000-.79L6.307 4.192A.502.502 0 006 4.087z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgStartFilled;
