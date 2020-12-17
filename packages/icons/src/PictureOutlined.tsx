import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgPictureOutlined(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    style: {
      color,
    },
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '16px' : size,
    height: !size ? '16px' : size,
  };
  const file = (
    <svg
      viewBox="0 0 60 44"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={1.414}
      fill="currentColor"
      {...props}
    >
      <path
        d="M42.305 3.999a2 2 0 010 4L6 8a2.001 2.001 0 00-1.995 1.851L4 10v28c0 1.054.816 1.918 1.851 1.995L6 40h43a2.001 2.001 0 001.995-1.851L51 38V16.122a2 2 0 014 0V42a2 2 0 01-2 2H2a2 2 0 01-2-2V6a2 2 0 012-2l40.305-.001zm-3.689 12.055c.02.019.038.039.055.061l10.228 13.52a.505.505 0 01.101.301v7.697a.5.5 0 01-.5.5H7.018a.5.5 0 01-.395-.805l4.222-5.464a.5.5 0 01.655-.121l3.196 1.942a.501.501 0 00.668-.139l4.736-6.698a.5.5 0 01.611-.169l4.729 2.098a.5.5 0 00.566-.113l11.903-12.59a.5.5 0 01.707-.02zM12 13.689c2.209 0 4 1.751 4 3.911s-1.791 3.911-4 3.911S8 19.76 8 17.6s1.791-3.911 4-3.911zM53.5 0c1.056 0 1.912.856 1.912 1.912l-.001 2.574h2.72a1.87 1.87 0 010 3.739l-2.72-.001.001 2.575a1.912 1.912 0 11-3.824 0V8.224l-2.719.001a1.87 1.87 0 010-3.739h2.719V1.912C51.588.856 52.444 0 53.5 0z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgPictureOutlined;
