import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgTimeOutlined(wrapperProps: IconProps) {
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
        d="M8 .002a8 8 0 100 16 8 8 0 000-16zm0 1.143a6.864 6.864 0 016.858 6.857 6.864 6.864 0 01-6.857 6.857 6.864 6.864 0 01-6.857-6.857A6.864 6.864 0 018 1.145z"
        fill="currentColor"
      />
      <path
        d="M9.144 9.145c0 .152-.06.297-.167.404a.576.576 0 01-.405.167h-4A.57.57 0 014 9.146v-.001c0-.316.256-.572.571-.572h3.2a.229.229 0 00.229-.228V4.572a.57.57 0 01.57-.57h.003c.15 0 .296.06.403.167a.575.575 0 01.167.403v4.573z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgTimeOutlined;
