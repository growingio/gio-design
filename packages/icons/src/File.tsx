import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgFile(wrapperProps: IconProps) {
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
    <svg
      viewBox="0 0 60 50"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={1.414}
      fill="currentColor"
      {...props}
    >
      <path
        d="M22.929 0c1.326 0 2.597.479 3.535 1.331l7.072 6.429c.938.852 2.209 1.331 3.535 1.331H55c1.326 0 2.598.479 3.536 1.331.937.853 1.464 2.009 1.464 3.214v31.819c0 1.205-.527 2.361-1.464 3.214C57.598 49.521 56.326 50 55 50H5c-2.761 0-5-2.035-5-4.545V4.545C0 2.035 2.239 0 5 0h17.929zM54.96 46c.575 0 1.04-.378 1.04-.844V27.844c0-.466-.465-.844-1.04-.844H5.04c-.575 0-1.04.378-1.04.844v17.312c0 .466.465.844 1.04.844h49.92zM35.201 12.857c-1.379 0-2.506-.6-3.677-1.59-2.248-1.9-5.373-4.423-7.343-6.48C23.205 3.77 21.872 4 20.493 4H5.04C4.465 4 4 4.486 4 5.086v16.828c0 .6.465 1.086 1.04 1.086h49.92c.276 0 .54-.115.735-.318.195-.204.305-.48.305-.768v-7.971c0-.288-.11-.564-.305-.768a1.02 1.02 0 00-.735-.318H35.201z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgFile;
