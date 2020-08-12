import * as React from 'react';

function SvgPlusOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
      <defs>
        <style />
      </defs>
      <g id="plus-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="plus-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M6 6.51A.54.54 0 006.51 6V.49a.49.49 0 011 0V6a.54.54 0 00.49.51h5.48a.49.49 0 010 1H8a.54.54 0 00-.51.49v5.48a.49.49 0 01-1 0V8A.54.54 0 006 7.49H.49a.49.49 0 010-1z"
            fill="#323333"
            fillRule="evenodd"
            id="plus-outlined_svg__plus"
          />
        </g>
      </g>
    </svg>
  );
}

const MemoSvgPlusOutlined = React.memo(SvgPlusOutlined);
export default MemoSvgPlusOutlined;
