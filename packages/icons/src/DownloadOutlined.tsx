import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgDownloadOutlined(wrapperProps: IconProps) {
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
        d="M6.16 8.28a.2.2 0 00.34-.14V.5a.5.5 0 011 0v7.64a.2.2 0 00.34.14l.93-.93a.5.5 0 01.7 0 .49.49 0 01.15.36.47.47 0 01-.15.35l-2.12 2.12a.48.48 0 01-.7 0L4.53 8.06a.47.47 0 01-.15-.35.49.49 0 01.15-.36.51.51 0 01.7 0zM14 13a1 1 0 01-1 1H1a1 1 0 01-1-1v-2.5a.5.5 0 01.5-.5.5.5 0 01.5.5v2a.55.55 0 00.54.54h10.92a.55.55 0 00.54-.54v-2a.5.5 0 011 0z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgDownloadOutlined;
