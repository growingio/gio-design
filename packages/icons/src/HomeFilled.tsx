import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgHomeFilled(wrapperProps: IconProps) {
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
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <defs>
        <style />
      </defs>
      <path
        d="M1011.694 552.245a14.16 14.16 0 010 15.65 16.396 16.396 0 01-14.16 8.944h-76.017a35.028 35.028 0 00-26.085 11.18 38.009 38.009 0 00-11.179 26.083v372.635A37.263 37.263 0 01846.99 1024H660.673a37.263 37.263 0 01-37.264-37.263V614.102a37.263 37.263 0 00-10.433-26.084 36.518 36.518 0 00-26.83-11.179H437.092a35.028 35.028 0 00-26.084 11.18 38.009 38.009 0 00-11.18 26.083v372.635A37.263 37.263 0 01362.567 1024H176.248a37.263 37.263 0 01-37.263-37.263V614.102a37.263 37.263 0 00-10.434-26.084 36.518 36.518 0 00-26.83-11.179H25.705a14.905 14.905 0 01-14.905-8.943 14.905 14.905 0 010-15.65L485.535 12.67A35.773 35.773 0 01513.11.001a37.263 37.263 0 0128.32 12.67z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgHomeFilled;
