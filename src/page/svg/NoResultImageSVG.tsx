import * as React from 'react';
import { InjectRandomIds } from '.';

const NoResultImage = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGElement>>((props, ref) => (
  <svg role="img" aria-labelledby="title" viewBox="0 0 260 166" fill="none" ref={ref} {...props}>
    <title id="title">No result image</title>
    <circle cx={70.67} cy={105.812} r={3.506} stroke="#B8D1FF" strokeWidth={2} />
    <circle cx={191.004} cy={67.49} r={3.004} fill="#B8D1FF" />
    <rect x={61} y={25.992} width={12.015} height={3.004} rx={1.502} fill="#B8D1FF" />
    <rect
      x={65.506}
      y={33.502}
      width={12.015}
      height={3.004}
      rx={1.502}
      transform="rotate(-90 65.506 33.502)"
      fill="#B8D1FF"
    />
    <rect x={87.838} width={84.198} height={117.145} rx={4} fill="url(#no_result__prefix__paint0_linear)" />
    <rect x={104.296} y={18.925} width={34.167} height={4.881} rx={2.441} fill="#fff" fillOpacity={0.9} />
    <rect x={104} y={31.486} width={57} height={5} rx={2.5} fill="#fff" fillOpacity={0.9} />
    <rect x={104} y={43.486} width={57} height={5} rx={2.5} fill="#fff" fillOpacity={0.9} />
    <path
      opacity={0.4}
      fill="#fff"
      d="M114.492 97.562l43.943-33.899 5.498 7.127-43.944 33.898zM104.228 89.642l49.056-37.846 5.497 7.126-49.055 37.846z"
    />
    <circle
      opacity={0.8}
      cx={131.746}
      cy={73.444}
      r={31.505}
      transform="rotate(-41.712 131.746 73.444)"
      stroke="#B4B9CA"
      strokeWidth={5}
    />
    <rect
      x={152.836}
      y={102.783}
      width={9.068}
      height={12.091}
      rx={2}
      transform="rotate(-41.712 152.836 102.783)"
      fill="#DFE4EE"
    />
    <rect
      x={145.551}
      y={99.153}
      width={15.114}
      height={10.579}
      rx={2}
      transform="rotate(-41.712 145.551 99.153)"
      fill="#88A6FF"
    />
    <rect
      x={157}
      y={111.543}
      width={15.114}
      height={23.009}
      rx={3}
      transform="rotate(-41.712 157 111.543)"
      fill="#88A6FF"
    />
    <path
      d="M153.531 50.535c11.577 12.99 10.433 32.905-2.556 44.482-12.989 11.578-32.905 10.434-44.482-2.555-11.578-12.99-10.433-32.905 2.556-44.483 12.989-11.577 32.904-10.433 44.482 2.556z"
      stroke="#DFE4EE"
      strokeWidth={5}
    />
    <path d="M0 165.136c102.866-40.07 159.923-39.57 260 0H0z" fill="url(#no_result__prefix__paint1_linear)" />
    <defs>
      <linearGradient
        id="no_result__prefix__paint0_linear"
        x1={122.5}
        y1={-43}
        x2={143.5}
        y2={102.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5F87FF" />
        <stop offset={1} stopColor="#F0F5FF" />
      </linearGradient>
      <linearGradient
        id="no_result__prefix__paint1_linear"
        x1={131.048}
        y1={135.275}
        x2={131.048}
        y2={165.136}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B8D1FF" />
        <stop offset={1} stopColor="#fff" stopOpacity={0.453} />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
    </defs>
  </svg>
));

export default InjectRandomIds(NoResultImage);
