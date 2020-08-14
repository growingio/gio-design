import * as React from 'react';

function SvgLoadingWhiteOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <path d="M7 0a7 7 0 107 7 7 7 0 00-7-7zm0 13a6 6 0 116-6 6 6 0 01-6 6z" fill="#f7f8f8" opacity={0.4} />
          <path
            d="M.5 7.5A.5.5 0 010 7a7 7 0 017-7 .5.5 0 01.5.5.5.5 0 01-.5.5 6 6 0 00-6 6 .5.5 0 01-.5.5z"
            fill="#fff"
          />
        </g>
      </g>
    </svg>
  );
}

const MemoSvgLoadingWhiteOutlined = React.memo(SvgLoadingWhiteOutlined);
export default MemoSvgLoadingWhiteOutlined;
