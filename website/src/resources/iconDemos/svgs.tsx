import * as React from 'react';

function OutlinedSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24px" height="24px" fill="#656565" viewBox="0 0 24 24" {...props}>
      <path d="M19 5v14H5V5h14m.2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4.8c0-.99-.81-1.8-1.8-1.8z" />
    </svg>
  );
}

export const Outlined = React.memo(OutlinedSvg);

function FilledSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24px" height="24px" fill="#656565" viewBox="0 0 24 24" {...props}>
      <path d="M19.2 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4.8c0-.99-.81-1.8-1.8-1.8z" />
    </svg>
  );
}

export const Filled = React.memo(FilledSvg);
