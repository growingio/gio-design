import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgLineChartOutlined(wrapperProps: IconProps) {
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
      viewBox="0 0 78 78"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={1.414}
      fill="currentColor"
      {...props}
    >
      <path
        d="M5.556 69.451c0 .739.294 1.445.81 1.967a2.798 2.798 0 001.967.81H75c.739 0 1.445.295 1.967.812.516.522.81 1.228.81 1.967A2.779 2.779 0 0175 77.784H5.556A5.558 5.558 0 010 72.23V2.784a2.779 2.779 0 015.556 0v66.667zm55.45-50.6a1.102 1.102 0 00-.34-1.167 6.887 6.887 0 01-2.333-5.177 6.947 6.947 0 016.945-6.945 6.947 6.947 0 016.944 6.945 6.954 6.954 0 01-5.822 6.855 1.079 1.079 0 00-.9.778c-2.183 7.433-4.639 14.783-7.011 22.161a1.11 1.11 0 00.333 1.178 6.89 6.89 0 012.29 5.139 6.947 6.947 0 01-6.945 6.944 6.947 6.947 0 01-6.656-8.933c.128-.417 0-.872-.328-1.161-2.05-1.8-9.138-8-11.188-9.8a1.117 1.117 0 00-1.2-.167c-.867.4-1.834.617-2.85.617h-.034c-.433 0-.828.25-1.01.644-1.345 2.934-6.623 14.411-7.956 17.306-.184.4-.112.866.177 1.194a6.865 6.865 0 011.64 4.467 6.947 6.947 0 01-6.945 6.944 6.947 6.947 0 01-6.945-6.944 6.947 6.947 0 016.945-6.945.943.943 0 00.866-.566c2.6-5.834 5.395-11.584 8.14-17.356.188-.4.122-.872-.173-1.205A6.86 6.86 0 0125 29.173a6.947 6.947 0 016.945-6.944 6.947 6.947 0 016.655 8.933c-.128.417 0 .872.328 1.161 2.05 1.8 9.133 8 11.189 9.8.333.284.8.35 1.2.167a6.747 6.747 0 011.95-.561c.433-.05.794-.35.922-.767 1.078-3.478 5.75-18.644 6.817-22.11z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgLineChartOutlined;
