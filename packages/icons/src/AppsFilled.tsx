import * as React from 'react';

function SvgAppsFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className='apps-filled_svg__icon' viewBox='0 0 1024 1024' width='1em' height='1em' {...props}>
      <defs>
        <style />
      </defs>
      <path d='M0 102.4a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0zM409.6 102.4a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0zM819.2 102.4a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0zM0 512a102.4 102.4 0 10204.8 0A102.4 102.4 0 100 512zM409.6 512a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0zM819.2 512a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0zM0 921.6a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0zM409.6 921.6a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0zM819.2 921.6a102.4 102.4 0 10204.8 0 102.4 102.4 0 10-204.8 0z' />
    </svg>
  );
}

const MemoSvgAppsFilled = React.memo(SvgAppsFilled);
export default MemoSvgAppsFilled;
