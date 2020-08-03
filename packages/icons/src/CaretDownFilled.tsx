import * as React from 'react';

function SvgCaretDownFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 14 14' width='1em' height='1em' {...props}>
      <defs>
        <style />
      </defs>
      <g id='caret-down-filled_svg__\u56FE\u5C42_2' data-name='\u56FE\u5C42 2'>
        <g id='caret-down-filled_svg__\u56FE\u5C42_1-2' data-name='\u56FE\u5C42 1'>
          <path
            d='M7.39 9.51a.5.5 0 01-.78 0l-3-3.7a.51.51 0 01-.06-.53A.5.5 0 014 5h6a.5.5 0 01.45.28.51.51 0 01-.06.53z'
            fill='#323333'
            fillRule='evenodd'
            id='caret-down-filled_svg__down-2'
          />
        </g>
      </g>
    </svg>
  );
}

const MemoSvgCaretDownFilled = React.memo(SvgCaretDownFilled);
export default MemoSvgCaretDownFilled;
