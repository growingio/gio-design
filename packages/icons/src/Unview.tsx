import * as React from 'react';

function SvgUnview(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 14 14' width='1em' height='1em' {...props}>
      <g data-name='Layer 2'>
        <g data-name='Layer 1'>
          <path fill='none' d='M0 0h14v14H0z' />
          <path
            d='M7.09 6H7a1 1 0 00-1 1v.09zm.82.6L6.6 7.91A.9.9 0 007 8a1 1 0 001-1 .9.9 0 00-.09-.4zm.94-2.35A7.06 7.06 0 007 4a6.92 6.92 0 00-5.72 3 6.79 6.79 0 002.57 2.25l1.36-1.36A1.91 1.91 0 015 7a2 2 0 012-2 1.91 1.91 0 01.89.21zm1 .37l-1.2 1.24A2 2 0 019 7a2 2 0 01-2 2 2 2 0 01-1.14-.35l-1 1A7 7 0 007 10a6.92 6.92 0 005.72-3 6.88 6.88 0 00-2.83-2.38zm-.49-1.27a.49.49 0 00.5-.12l1.89-1.89a.51.51 0 01.71 0 .5.5 0 010 .71l-1.64 1.64a.2.2 0 00-.05.17.18.18 0 00.1.14 7.7 7.7 0 012.39 2.08l.25.36a1 1 0 010 1.12l-.25.36A7.84 7.84 0 017 11a8 8 0 01-2.64-.45.5.5 0 00-.52.12l-2 2a.5.5 0 01-.7 0 .5.5 0 010-.71l1.78-1.78A.21.21 0 003 10a.17.17 0 00-.09-.14A8 8 0 01.74 7.92l-.25-.36a1 1 0 010-1.12l.25-.36A7.87 7.87 0 017 3a8 8 0 012.36.35z'
            fill='currentColor'
            fillRule='evenodd'
          />
        </g>
      </g>
    </svg>
  );
}

const MemoSvgUnview = React.memo(SvgUnview);
export default MemoSvgUnview;
