import * as React from 'react';

function SvgRightOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
      <defs>
        <style />
      </defs>
      <g id="right-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="right-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M9.48 6.29l.35.35A.53.53 0 0110 7a.51.51 0 01-.15.35l-.35.35-4.6 4.6a.5.5 0 01-.71 0 .51.51 0 010-.71l4.44-4.45A.2.2 0 008.69 7a.17.17 0 00-.06-.14L4.17 2.39a.47.47 0 010-.69.51.51 0 01.72 0z"
            fill="currentColor"
            fillRule="evenodd"
            id="right-outlined_svg__right"
          />
        </g>
      </g>
    </svg>
  );
}

const MemoSvgRightOutlined = React.memo(SvgRightOutlined);
export default MemoSvgRightOutlined;
