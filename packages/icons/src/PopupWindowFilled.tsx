import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgPopupWindowFilled(wrapperProps: IconProps) {
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
        d="M10.706 1.448H4.38a1.945 1.945 0 00-1.947 1.931v6.758c0 1.063.876 1.931 1.947 1.931h6.326v.483c0 .821-.633 1.449-1.46 1.449H1.46C.633 14 0 13.372 0 12.551V1.448C0 .627.633 0 1.46 0h7.786c.827 0 1.46.627 1.46 1.448zM4.225 2.47h8.844c.512 0 .931.453.931 1.007v7.045c0 .554-.419 1.007-.931 1.007H4.225c-.512 0-.931-.453-.931-1.007V3.477c0-.554.419-1.007.931-1.007z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgPopupWindowFilled;
