import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgAppsFilled(wrapperProps: IconProps) {
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
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <defs>
        <style />
      </defs>
      <path
        d="M0 102.4a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0zM409.6 102.4a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0zM819.2 102.4a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0zM0 512a102.4 102.4 0 10204.8 0A102.4 102.4 0 100 512zM409.6 512a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0zM819.2 512a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0zM0 921.6a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0zM409.6 921.6a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0zM819.2 921.6a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgAppsFilled;
