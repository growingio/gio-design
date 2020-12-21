import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgShrinkOutlined(wrapperProps: IconProps) {
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
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      fill="currentColor"
      {...props}
    >
      <path
        d="M10.481 11.188a1.018 1.018 0 00-1.282-.128A5.846 5.846 0 016 12c-3.312 0-6-2.689-6-6 0-3.312 2.688-6 6-6 3.311 0 6 2.688 6 6a5.964 5.964 0 01-.93 3.206c-.264.398-.211.927.127 1.265.938.956 2.656 2.675 2.656 2.675a.5.5 0 01-.707.707l-2.665-2.665zM6 1c2.759 0 5 2.24 5 5 0 2.759-2.241 5-5 5-2.76 0-5-2.241-5-5 0-2.76 2.24-5 5-5zm3 5a.5.5 0 00-.5-.5h-5a.5.5 0 100 1h5A.498.498 0 009 6z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgShrinkOutlined;
