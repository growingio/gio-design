import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgMessageFilled(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    color,
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    <svg
      viewBox="0 0 14 14"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      fill="currentColor"
      {...props}
    >
      <path fill="currentColor" d="M.001.002h14v14.001h-14z" />
      <path
        d="M12.309.875H1.691C.553.875 0 1.378 0 2.385v7.217c0 1.006.519 1.482 1.628 1.482h1.628l-.2 1.538c.004.192.12.365.297.443a.616.616 0 00.578-.025l3.232-1.956h5.209c1.127 0 1.628-.476 1.628-1.482V2.385c0-1.007-.564-1.51-1.691-1.51zm-5.96 7.03h-2.75a.662.662 0 01-.651-.492.647.647 0 01.633-.803h2.75a.663.663 0 01.651.493.644.644 0 01-.12.555.652.652 0 01-.513.247zm4.07-2.751h-6.82a.664.664 0 01-.651-.493.647.647 0 01.633-.803h6.82a.663.663 0 01.651.493.647.647 0 01-.633.803z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgMessageFilled;
