import * as React from 'react';

function SvgFileDoc(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 30 30"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      width="1em"
      height="1em"
      {...props}
    >
      <g>
        <clipPath id="file-doc_svg__a">
          <path d="M7 0h15l8 8v19a3 3 0 01-3 3H7a3 3 0 01-3-3V3a3 3 0 013-3z" />
        </clipPath>
        <g clipPath="url(#file-doc_svg__a)">
          <path fill="#fff" d="M-1-5h36v40H-1z" />
        </g>
      </g>
      <path fill="#008ff3" d="M0 16h22v10H0z" />
      <text
        x={3}
        y={24}
        fontFamily="'PingFangSC-Semibold','PingFang SC',sans-serif"
        fontWeight={600}
        fontSize={8}
        fill="#fff"
      >
        {'.doc'}
      </text>
      <g transform="translate(0 -2)">
        <clipPath id="file-doc_svg__b">
          <path d="M4 14v4H0l4-4z" />
        </clipPath>
        <g clipPath="url(#file-doc_svg__b)">
          <path fill="#0067c0" d="M-5 9H9v14H-5z" />
        </g>
      </g>
      <g transform="translate(0 -22)">
        <clipPath id="file-doc_svg__c">
          <path d="M22 22l8 8h-5a3 3 0 01-3-3v-5z" />
        </clipPath>
        <g clipPath="url(#file-doc_svg__c)">
          <path fill="#dfdfdf" d="M17 17h18v18H17z" />
        </g>
      </g>
    </svg>
  );
}

const MemoSvgFileDoc = React.memo(SvgFileDoc);
export default MemoSvgFileDoc;
