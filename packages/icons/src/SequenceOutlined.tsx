import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgSequenceOutlined(wrapperProps: IconProps) {
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="currentColor" {...props}>
      <path
        d="M14 1.5a.5.5 0 00-.5-.5H.5a.5.5 0 000 1h13a.5.5 0 00.5-.5zM14 7a.5.5 0 00-.5-.5H.5A.5.5 0 000 7a.5.5 0 00.5.5h13A.5.5 0 0014 7zm0 5.49a.5.5 0 00-.5-.5H.5a.5.5 0 000 1h13a.5.5 0 00.5-.5z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgSequenceOutlined;
