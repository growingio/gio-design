import React from 'react';
import { IconProps } from './interface';

function DisabledPictureSVG(props: IconProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <svg width={51} height={37} viewBox="0 0 51 37" {...props}>
      <rect width={51} height={37} rx={3} fill="#C4C8D3" />
      <rect x={3} y={2} width={45} height={33} rx={3} fill="#F3F3F3" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.405 11.215a.8.8 0 011.291 0L46 23.93v6.72H5.581a.8.8 0 01-.625-1.299l6.576-8.253a.8.8 0 011.251 0l2.713 3.405 6.247-7.701a.8.8 0 011.243 0l4.38 5.4 8.039-10.987z"
        fill="#DFE4EE"
      />
      <circle cx={11.5} cy={10.5} r={3.5} fill="#DFE4EE" />
    </svg>
  );
}

export default DisabledPictureSVG;
