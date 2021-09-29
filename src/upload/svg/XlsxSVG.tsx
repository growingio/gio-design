import React from 'react';
import { IconProps } from './interface';

function XlsxSVG(props: IconProps) {
  return (
    <svg
      viewBox="0 0 30 30"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <g>
        <clipPath id="prefix__a">
          <path d="M7 0h15l8 8v19a3 3 0 01-3 3H7a3 3 0 01-3-3V3a3 3 0 013-3z" />
        </clipPath>
        <g clipPath="url(#prefix__a)">
          <path fill="#fff" d="M-1-5h36v40H-1z" />
        </g>
      </g>
      <path fill="#00743f" d="M0 16h22v10H0z" />
      <text
        x={2}
        y={24}
        fontFamily="'PingFangSC-Semibold','PingFang SC',sans-serif"
        fontWeight={600}
        fontSize={8}
        fill="#fff"
      >
        .xlsx
      </text>
      <g transform="translate(0 -2)">
        <clipPath id="prefix__b">
          <path d="M4 14v4H0l4-4z" />
        </clipPath>
        <g clipPath="url(#prefix__b)">
          <path fill="#004d24" d="M-5 9H9v14H-5z" />
        </g>
      </g>
      <g transform="translate(0 -22)">
        <clipPath id="prefix__c">
          <path d="M22 22l8 8h-5a3 3 0 01-3-3v-5z" />
        </clipPath>
        <g clipPath="url(#prefix__c)">
          <path fill="#dfdfdf" d="M17 17h18v18H17z" />
        </g>
      </g>
    </svg>
  );
}

export default XlsxSVG;
