import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgQuestionCircleOutlined(wrapperProps: IconProps) {
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
      <g id="question-circle-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="question-circle-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M7 13a6 6 0 114.24-1.76A6 6 0 017 13zM7 0a7 7 0 105 2.05A7 7 0 007 0zm.12 3a2.54 2.54 0 00-1.91.7 2.54 2.54 0 00-.69 1.69.24.24 0 00.05.14.2.2 0 00.15.06h.75a.21.21 0 00.2-.19A1.78 1.78 0 016 4.47 1.22 1.22 0 017 4a1.26 1.26 0 011 .33 1.25 1.25 0 01.32.9A1.27 1.27 0 018 6l-.19.21a5.43 5.43 0 00-1.26 1.4 2.15 2.15 0 00-.22 1 .21.21 0 00.19.19h.84a.15.15 0 00.15-.15 1.55 1.55 0 01.18-.73 1.81 1.81 0 01.46-.57 12.48 12.48 0 00.92-.86 2.1 2.1 0 00.42-1.34 2 2 0 00-.66-1.57A2.49 2.49 0 007.12 3zm-.2 6.43a.76.76 0 00-.57.22.73.73 0 00-.23.56.79.79 0 00.23.56.81.81 0 00.57.23.85.85 0 00.57-.22.78.78 0 00.24-.57.73.73 0 00-.23-.56.78.78 0 00-.58-.22z"
            fill="currentColor"
            id="question-circle-outlined_svg__question-circle"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgQuestionCircleOutlined;
