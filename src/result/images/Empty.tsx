import * as React from 'react';
import InjectRandomIds from './InjectRandomIds';

const EmptySVG = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGElement>>((props, ref) => (
  <svg role="img" aria-labelledby="title" viewBox="0 0 260 164" fill="none" ref={ref} {...props}>
    <title id="title">No data image</title>
    <path d="M0 163.147c102.866-40.07 159.923-39.57 260 0H0z" fill="url(#no_data__prefix0__paint_linear)" />
    <path
      d="M92.838 107.443l2.17-62.923a4 4 0 013.997-3.862h78.36a4 4 0 013.995 4.184l-2.893 62.923a4 4 0 01-3.995 3.816H96.836a4 4 0 01-3.998-4.138z"
      fill="#88A6FF"
    />
    <path
      d="M118.04 10.944a2 2 0 012.392-1.51l59.711 13.493a2 2 0 011.51 2.391l-16.368 72.434a2 2 0 01-2.391 1.51l-59.711-13.493a2 2 0 01-1.51-2.391l16.367-72.434z"
      fill="#DCE6FA"
    />
    <path d="M105 26a2 2 0 012-2h61.216a2 2 0 012 2v74.26a2 2 0 01-2 2H107a2 2 0 01-2-2V26z" fill="#F0F5FF" />
    <path
      d="M88.263 108.789L82.53 50.758a4 4 0 013.981-4.394h17.57a4 4 0 012.828 1.172l2.548 2.548a4.001 4.001 0 002.829 1.172h58.952a4 4 0 013.994 3.787l2.834 53.14a4 4 0 01-3.994 4.213h-81.83a4 4 0 01-3.98-3.607z"
      fill="url(#no_data__prefix1__paint_linear)"
    />
    <rect x={90.249} y={66.745} width={79.89} height={4.891} rx={2.446} fill="#F7F8FC" />
    <circle cx={92.695} cy={56.148} r={4.076} fill="#F7F8FC" />
    <circle cx={192.649} cy={30.253} r={3.752} stroke="#B8D1FF" />
    <circle cx={78.909} cy={109.978} r={2.689} stroke="#B8D1FF" />
    <path
      d="M99.105 18.56c0 8.806-9.994 15.945-22.323 15.945-12.328 0-22.323-7.139-22.323-15.945 0-8.806 9.995-15.945 22.323-15.945 12.33 0 22.323 7.139 22.323 15.945z"
      fill="#B8D1FF"
    />
    <path
      d="M93.231 26.707a1 1 0 011.18.401l4.766 7.434c.51.796-.268 1.79-1.163 1.486l-13.073-4.44c-.895-.304-.907-1.567-.017-1.888l8.307-2.993z"
      fill="#B8D1FF"
    />
    <circle cx={65.355} cy={18.826} r={2.392} fill="#fff" />
    <circle cx={76.768} cy={18.826} r={2.392} fill="#fff" />
    <circle cx={88.741} cy={18.826} r={2.392} fill="#fff" />
    <path
      d="M199.163 71.775a.3.3 0 01.512.09l2.176 5.939a.3.3 0 01-.334.398l-6.231-1.085a.3.3 0 01-.179-.488l4.056-4.854z"
      fill="#B8D1FF"
    />
    <path
      d="M161.814 118.461c26.179 1.496 27.646-6.357 36.15-39.31"
      stroke="#B8D1FF"
      strokeWidth={0.5}
      strokeLinecap="round"
      strokeDasharray="1 1"
    />
    <rect
      x={59.94}
      y={72.613}
      width={8.504}
      height={2.126}
      rx={1.063}
      transform="rotate(-22.655 59.94 72.613)"
      fill="#B8D1FF"
    />
    <rect
      x={64.93}
      y={76.29}
      width={8.504}
      height={2.126}
      rx={1.063}
      transform="rotate(-112.655 64.93 76.29)"
      fill="#B8D1FF"
    />
    <defs>
      <linearGradient
        id="no_data__prefix0__paint_linear"
        x1={131.048}
        y1={133.286}
        x2={131.048}
        y2={163.147}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B8D1FF" />
        <stop offset={1} stopColor="#fff" stopOpacity={0.453} />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
      <linearGradient
        id="no_data__prefix1__paint_linear"
        x1={130}
        y1={62.5}
        x2={130}
        y2={137.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B8D1FF" />
        <stop offset={1} stopColor="#698FFF" />
      </linearGradient>
    </defs>
  </svg>
));
const Empty = InjectRandomIds(EmptySVG);
Empty.displayName = 'Empty';
export default Empty;
