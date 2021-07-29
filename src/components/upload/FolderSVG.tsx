import React from 'react';

interface IconProps {
  style?: React.CSSProperties;
}

function FolderSVG(props: IconProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <svg width={66} height={47} viewBox="0 0 66 47" {...props}>
      <path
        opacity={0.9}
        d="M7.095 42.046l1.308-37.92A4.273 4.273 0 0112.673 0h48.012a4.273 4.273 0 014.268 4.469l-1.743 37.92a4.273 4.273 0 01-4.268 4.077H11.365a4.273 4.273 0 01-4.27-4.42z"
        fill="#5F87FF"
      />
      <path
        d="M3.892 43.148L.463 8.432a4.273 4.273 0 014.253-4.693h9.003c1.133 0 2.22.45 3.021 1.252l.702.701a4.273 4.273 0 003.021 1.252h36.372a4.273 4.273 0 014.267 4.045l1.68 31.511a4.273 4.273 0 01-4.266 4.5H8.144a4.273 4.273 0 01-4.252-3.852z"
        fill="#B8D1FF"
      />
      <rect x={4.272} y={17.091} width={53.409} height={3.205} rx={1.602} fill="#fff" />
      <circle cx={6.943} cy={10.147} r={2.67} fill="#fff" />
    </svg>
  );
}

export default FolderSVG;
