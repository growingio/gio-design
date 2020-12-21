import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgMiniProgramFilled(wrapperProps: IconProps) {
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
    <svg
      viewBox="0 0 78 78"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={1.414}
      fill="currentColor"
      {...props}
    >
      <path
        d="M38.89.006c21.461 0 38.89 17.428 38.89 38.89 0 21.46-17.429 38.888-38.89 38.888C17.43 77.784.001 60.356.001 38.895.001 17.435 17.43.006 38.891.006zm9.378 19.445c6.267 0 11.361 4.71 11.361 10.544 0 1.811-.517 3.584-1.467 5.184-1.427 2.333-3.716 4.06-6.483 4.883-.733.217-1.294.3-1.811.3a2.138 2.138 0 01-2.161-2.156c0-1.21.95-2.16 2.16-2.16.084 0 .257 0 .473-.09 1.861-.516 3.328-1.6 4.15-3.022a5.522 5.522 0 00.822-2.939c0-3.416-3.155-6.222-7-6.222a7.78 7.78 0 00-3.805.994c-2.028 1.167-3.24 3.112-3.24 5.228v18.106c0 3.672-2.032 7.039-5.4 8.944a11.941 11.941 0 01-5.921 1.556c-6.267 0-11.367-4.711-11.367-10.545 0-1.816.522-3.589 1.472-5.183 1.428-2.333 3.717-4.067 6.484-4.883.777-.217 1.294-.306 1.81-.306 1.212 0 2.162.95 2.162 2.161s-.95 2.161-2.161 2.161c-.084 0-.256 0-.473.09-1.86.56-3.327 1.638-4.15 3.021a5.495 5.495 0 00-.822 2.94c0 3.41 3.156 6.222 7.045 6.222a7.774 7.774 0 003.8-.995c2.033-1.167 3.244-3.111 3.244-5.228v-18.06c0-3.673 2.028-7.045 5.4-8.945 1.772-1.084 3.8-1.6 5.878-1.6z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgMiniProgramFilled;
