import * as React from 'react';

function SvgUpload(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 14 14"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={1.414}
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M14 12.897a1 1 0 01-1 1H1a1 1 0 01-1-1v-2.5a.5.5 0 111 0v2c0 .133.053.26.146.354a.504.504 0 00.354.146h11c.133 0 .26-.053.354-.146a.504.504 0 00.146-.354v-2c0-.133.053-.26.146-.354a.504.504 0 01.708 0 .5.5 0 01.146.354v2.5zM7.5 9.933a.5.5 0 01-1 0v-7.64a.199.199 0 00-.341-.141l-.927.927a.499.499 0 01-.707 0l-.001-.001a.498.498 0 010-.705L6.646.25a.5.5 0 01.708 0l2.121 2.12a.499.499 0 01-.707.708l-.927-.926a.199.199 0 00-.341.14v7.64z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoSvgUpload = React.memo(SvgUpload);
export default MemoSvgUpload;
