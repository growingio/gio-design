import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgInformationFilled(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    color,
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    <svg
      viewBox="0 0 59 59"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={1.414}
      fill="currentColor"
      {...props}
    >
      <path
        d="M29.167 0c16.096 0 29.167 13.072 29.167 29.168 0 16.095-13.07 29.166-29.167 29.166-16.095 0-29.166-13.07-29.166-29.166S13.07 0 29.167 0zm2.084 41.668c0 .554-.221 1.083-.609 1.475-.391.387-.92.608-1.475.608-.554 0-1.083-.22-1.475-.608a2.098 2.098 0 01-.608-1.475V25c0-.554.221-1.083.608-1.475.392-.388.921-.608 1.475-.608.555 0 1.084.22 1.475.608.388.392.609.92.609 1.475v16.667zm-2.084-27.084a3.126 3.126 0 010 6.25 3.126 3.126 0 010-6.25z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgInformationFilled;
