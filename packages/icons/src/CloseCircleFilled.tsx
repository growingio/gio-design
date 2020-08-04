import * as React from 'react';

function SvgCloseCircleFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 14 14' width='1em' height='1em' {...props}>
      <defs>
        <style />
      </defs>
      <g id='close-circle-filled_svg__\u56FE\u5C42_2' data-name='\u56FE\u5C42 2'>
        <g id='close-circle-filled_svg__\u56FE\u5C42_1-2' data-name='\u56FE\u5C42 1'>
          <path
            d='M4.17 4.17a.5.5 0 01.71 0l2 2a.19.19 0 00.28 0l2-2a.5.5 0 01.71 0 .5.5 0 010 .71l-2 2a.19.19 0 000 .28l2 2a.5.5 0 010 .71.5.5 0 01-.71 0l-2-2a.19.19 0 00-.28 0l-2 2a.5.5 0 01-.71 0 .5.5 0 010-.71l2-2a.19.19 0 000-.28l-2-2a.5.5 0 010-.71zM7 0a7 7 0 11-7 7 7 7 0 017-7z'
            fill='#323333'
            fillRule='evenodd'
            id='close-circle-filled_svg__close-circle'
          />
        </g>
      </g>
    </svg>
  );
}

const MemoSvgCloseCircleFilled = React.memo(SvgCloseCircleFilled);
export default MemoSvgCloseCircleFilled;
