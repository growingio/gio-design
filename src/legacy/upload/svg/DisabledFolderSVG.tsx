import React from 'react';
import { IconProps } from './interface';

function DisabledFolderSVG(props: IconProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <svg width={52} height={38} viewBox="0 0 52 38" {...props}>
      <path
        opacity={0.9}
        d="M5.858 33.658L6.892 3.687a3.377 3.377 0 013.375-3.26h37.947a3.377 3.377 0 013.374 3.531L50.21 33.93a3.377 3.377 0 01-3.374 3.222H9.233a3.377 3.377 0 01-3.375-3.494z"
        fill="#ADB2C2"
      />
      <path
        d="M3.326 34.529L.616 7.09a3.377 3.377 0 013.361-3.709h7.116c.896 0 1.755.356 2.388.99l.555.554c.633.633 1.492.989 2.387.989h28.748a3.377 3.377 0 013.373 3.197l1.328 24.906a3.377 3.377 0 01-3.373 3.557H6.688a3.377 3.377 0 01-3.36-3.045z"
        fill="#DFE4EE"
      />
      <rect x={3.627} y={13.934} width={42.213} height={2.533} rx={1.266} fill="#fff" />
      <circle cx={5.738} cy={8.447} r={2.111} fill="#fff" />
    </svg>
  );
}

export default DisabledFolderSVG;
