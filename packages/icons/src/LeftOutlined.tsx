import * as React from 'react';

function SvgLeftOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
      <defs>
        <style />
      </defs>
      <g id="left-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="left-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M4.52 6.29l-.35.35A.53.53 0 004 7a.51.51 0 00.15.35l.35.35 4.6 4.6a.5.5 0 00.71 0 .51.51 0 000-.71L5.37 7.14A.2.2 0 015.31 7a.17.17 0 01.06-.14l4.46-4.47a.47.47 0 000-.69.51.51 0 00-.72 0z"
            fill="currentColor"
            fillRule="evenodd"
            id="left-outlined_svg__left"
          />
        </g>
      </g>
    </svg>
  );
}

const MemoSvgLeftOutlined = React.memo(SvgLeftOutlined);
export default MemoSvgLeftOutlined;
