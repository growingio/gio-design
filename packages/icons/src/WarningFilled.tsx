import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgWarningFilled(wrapperProps: IconProps) {
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
      viewBox="0 0 59 59"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={1.414}
      fill="currentColor"
      {...props}
    >
      <path
        d="M29.167 0c16.096 0 29.167 13.072 29.167 29.168 0 16.095-13.07 29.166-29.167 29.166-16.095 0-29.166-13.07-29.166-29.166S13.07 0 29.167 0zm0 37.5a4.168 4.168 0 010 8.333 4.168 4.168 0 01-4.166-4.165c0-2.3 1.866-4.167 4.166-4.167zm3.938-22.707a2.073 2.073 0 00-.53-1.605 2.078 2.078 0 00-1.541-.687h-3.733c-.588 0-1.146.25-1.542.687a2.073 2.073 0 00-.53 1.605l1.78 17.791c.042.425.4.75.83.75h2.658c.429 0 .787-.325.829-.75l1.779-17.791z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgWarningFilled;
