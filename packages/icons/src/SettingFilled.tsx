import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgSettingFilled(wrapperProps: IconProps) {
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
      <defs>
        <style />
      </defs>
      <g id="setting-filled_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="setting-filled_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M13.85 6l-.09-.26a.48.48 0 00-.4-.33l-1-.15a.18.18 0 01-.16-.13 5.38 5.38 0 00-.2-.52.2.2 0 010-.21l.61-.81a.49.49 0 000-.52l-.12-.24a3 3 0 00-1.36-1.33l-.24-.12a.49.49 0 00-.52 0L9.56 2a.18.18 0 01-.2 0c-.19-.09-.37-.16-.56-.23a.21.21 0 01-.13-.16c0-.29-.13-1-.13-1A.5.5 0 008.2.24L8 .15a3.08 3.08 0 00-1.9 0l-.31.09a.51.51 0 00-.34.4l-.14 1a.21.21 0 01-.13.16 5.48 5.48 0 00-.56.2.17.17 0 01-.2 0l-.82-.59a.49.49 0 00-.52 0l-.24.12a3.06 3.06 0 00-1.35 1.29l-.12.24a.53.53 0 000 .52l.63.81a.22.22 0 010 .21 5.55 5.55 0 00-.24.56.22.22 0 01-.15.13l-1 .16a.5.5 0 00-.4.33L.15 6a3.08 3.08 0 000 1.9l.09.26a.49.49 0 00.4.33l1 .15a.18.18 0 01.16.13 5.38 5.38 0 00.24.55.22.22 0 010 .21l-.62.81a.53.53 0 000 .52l.12.24a3 3 0 001.34 1.33l.24.12a.49.49 0 00.52 0l.81-.55a.18.18 0 01.2 0 5.48 5.48 0 00.56.23.21.21 0 01.13.16l.14 1a.51.51 0 00.34.4l.26.09a3.08 3.08 0 001.9 0l.26-.09a.5.5 0 00.34-.4s.11-.72.15-1a.21.21 0 01.13-.16c.19-.07.37-.14.56-.23a.17.17 0 01.2 0l.81.61a.49.49 0 00.52 0l.24-.12a3 3 0 001.34-1.33l.12-.24a.49.49 0 000-.52L12 9.57a.2.2 0 010-.21 3.76 3.76 0 00.23-.55.21.21 0 01.17-.13l1-.15a.46.46 0 00.4-.33l.09-.26A3 3 0 0013.85 6zM7 9.48A2.5 2.5 0 119.5 7 2.5 2.5 0 017 9.48z"
            fill="currentColor"
            id="setting-filled_svg__setting"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgSettingFilled;
