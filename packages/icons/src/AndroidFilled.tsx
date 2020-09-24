import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgAndroidFilled(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    color,
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    <svg viewBox="0 0 14 14" fill="currentColor" {...props}>
      <defs>
        <style />
      </defs>
      <g id="android-filled_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="android-filled_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M8.66 2.81a.42.42 0 11.42-.42.42.42 0 01-.42.42m-3.26 0a.42.42 0 11.42-.42.42.42 0 01-.42.42m3.4-1.6l.7-1a.13.13 0 000-.21.14.14 0 00-.17 0l-.75 1.12a4.39 4.39 0 00-3.15 0L4.7.06a.14.14 0 00-.17 0A.12.12 0 004.5.2l.7 1a3.31 3.31 0 00-2 2.65h7.6a3.31 3.31 0 00-2-2.65zm-5.59 9.38a.63.63 0 00.2.47.63.63 0 00.47.19h.76v1.88a.86.86 0 101.71 0v-1.88h1.33v1.88a.86.86 0 101.71 0v-1.88h.76a.67.67 0 00.67-.66V4.41h-7.6v6.18zm8.93-6.2a.87.87 0 00-.61.26.9.9 0 00-.24.61v3.37a.86.86 0 101.71 0V5.25a.9.9 0 00-.24-.61.87.87 0 00-.61-.26zm-10.29 0a.86.86 0 00-.85.86v3.38a.86.86 0 00.25.61.79.79 0 00.6.26.79.79 0 00.6-.26.82.82 0 00.25-.61V5.25a.82.82 0 00-.25-.61.83.83 0 00-.6-.26z"
            fill="currentColor"
            id="android-filled_svg__android"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgAndroidFilled;
