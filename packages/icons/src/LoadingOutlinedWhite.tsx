import React from 'react';

function LoadingOutlinedWhite(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width='16px' height='16px' viewBox='0 0 16 16' {...props}>
      <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <g transform='translate(0.500000, 0.500000)' stroke='#FFFFFF'>
          <circle opacity='0.4' cx='7.5' cy='7.5' r='7.5' />
          <path d='M15,7.5 C15,3.35786438 11.6421356,0 7.5,0' strokeLinecap='round' />
        </g>
      </g>
    </svg>
  );
}

const MemoLoadingOutlinedWhite = React.memo(LoadingOutlinedWhite);
export default MemoLoadingOutlinedWhite;
