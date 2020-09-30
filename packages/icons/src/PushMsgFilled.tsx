import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgPushMsgFilled(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    color,
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    <svg
      viewBox="0 0 14 15"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      fill="currentColor"
      {...props}
    >
      <path
        d="M13.785.086a.48.48 0 01.207.497L11.95 12.564a.504.504 0 01-.493.415.493.493 0 01-.186-.039l-3.525-1.428-1.897 2.308a.462.462 0 01-.383.18.438.438 0 01-.173-.031.476.476 0 01-.237-.182.48.48 0 01-.089-.284l.01-2.719 6.767-8.282-8.36 7.244L.31 8.496c-.192-.071-.296-.214-.309-.428a.466.466 0 01.251-.462l13-7.535a.492.492 0 01.533.015z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgPushMsgFilled;
