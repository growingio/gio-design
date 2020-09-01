import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgFileXlsx(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    color,
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    <svg
      viewBox="0 0 30 30"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      fill="currentColor"
      {...props}
    >
      <g>
        <clipPath id="file-xlsx_svg__a">
          <path d="M7 0h15l8 8v19a3 3 0 01-3 3H7a3 3 0 01-3-3V3a3 3 0 013-3z" fill="currentColor" />
        </clipPath>
        <g clipPath="url(#file-xlsx_svg__a)">
          <path fill="currentColor" d="M-1-5h36v40H-1z" />
        </g>
      </g>
      <path fill="currentColor" d="M0 16h22v10H0z" />
      <text
        x={2}
        y={24}
        fontFamily="'PingFangSC-Semibold','PingFang SC',sans-serif"
        fontWeight={600}
        fontSize={8}
        fill="#fff"
      >
        {'.xlsx'}
      </text>
      <g transform="translate(0 -2)">
        <clipPath id="file-xlsx_svg__b">
          <path d="M4 14v4H0l4-4z" fill="currentColor" />
        </clipPath>
        <g clipPath="url(#file-xlsx_svg__b)">
          <path fill="currentColor" d="M-5 9H9v14H-5z" />
        </g>
      </g>
      <g transform="translate(0 -22)">
        <clipPath id="file-xlsx_svg__c">
          <path d="M22 22l8 8h-5a3 3 0 01-3-3v-5z" fill="currentColor" />
        </clipPath>
        <g clipPath="url(#file-xlsx_svg__c)">
          <path fill="currentColor" d="M17 17h18v18H17z" />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgFileXlsx;
