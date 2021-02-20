import React from 'react';
import TestRenderer from 'react-test-renderer';
import NoDataImage from '../NoDataImage';
import NoResultImage from '../NoResultImage';

describe('Images', () => {
  it('has a no data image', () => {
    const tree = TestRenderer.create(<NoDataImage />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <svg
        aria-labelledby="title"
        fill="none"
        role="img"
        viewBox="0 0 260 164"
      >
        <title
          id="title"
        >
          No data image
        </title>
        <path
          d="M0 163.147c102.866-40.07 159.923-39.57 260 0H0z"
          fill="url(#no_data__prefix__paint0_linear)"
        />
        <path
          d="M92.838 107.443l2.17-62.923a4 4 0 013.997-3.862h78.36a4 4 0 013.995 4.184l-2.893 62.923a4 4 0 01-3.995 3.816H96.836a4 4 0 01-3.998-4.138z"
          fill="#88A6FF"
        />
        <path
          d="M118.04 10.944a2 2 0 012.392-1.51l59.711 13.493a2 2 0 011.51 2.391l-16.368 72.434a2 2 0 01-2.391 1.51l-59.711-13.493a2 2 0 01-1.51-2.391l16.367-72.434z"
          fill="#DCE6FA"
        />
        <path
          d="M105 26a2 2 0 012-2h61.216a2 2 0 012 2v74.26a2 2 0 01-2 2H107a2 2 0 01-2-2V26z"
          fill="#F0F5FF"
        />
        <path
          d="M88.263 108.789L82.53 50.758a4 4 0 013.981-4.394h17.57a4 4 0 012.828 1.172l2.548 2.548a4.001 4.001 0 002.829 1.172h58.952a4 4 0 013.994 3.787l2.834 53.14a4 4 0 01-3.994 4.213h-81.83a4 4 0 01-3.98-3.607z"
          fill="url(#no_data__prefix__paint1_linear)"
        />
        <rect
          fill="#F7F8FC"
          height={4.891}
          rx={2.446}
          width={79.89}
          x={90.249}
          y={66.745}
        />
        <circle
          cx={92.695}
          cy={56.148}
          fill="#F7F8FC"
          r={4.076}
        />
        <circle
          cx={192.649}
          cy={30.253}
          r={3.752}
          stroke="#B8D1FF"
        />
        <circle
          cx={78.909}
          cy={109.978}
          r={2.689}
          stroke="#B8D1FF"
        />
        <path
          d="M99.105 18.56c0 8.806-9.994 15.945-22.323 15.945-12.328 0-22.323-7.139-22.323-15.945 0-8.806 9.995-15.945 22.323-15.945 12.33 0 22.323 7.139 22.323 15.945z"
          fill="#B8D1FF"
        />
        <path
          d="M93.231 26.707a1 1 0 011.18.401l4.766 7.434c.51.796-.268 1.79-1.163 1.486l-13.073-4.44c-.895-.304-.907-1.567-.017-1.888l8.307-2.993z"
          fill="#B8D1FF"
        />
        <circle
          cx={65.355}
          cy={18.826}
          fill="#fff"
          r={2.392}
        />
        <circle
          cx={76.768}
          cy={18.826}
          fill="#fff"
          r={2.392}
        />
        <circle
          cx={88.741}
          cy={18.826}
          fill="#fff"
          r={2.392}
        />
        <path
          d="M199.163 71.775a.3.3 0 01.512.09l2.176 5.939a.3.3 0 01-.334.398l-6.231-1.085a.3.3 0 01-.179-.488l4.056-4.854z"
          fill="#B8D1FF"
        />
        <path
          d="M161.814 118.461c26.179 1.496 27.646-6.357 36.15-39.31"
          stroke="#B8D1FF"
          strokeDasharray="1 1"
          strokeLinecap="round"
          strokeWidth={0.5}
        />
        <rect
          fill="#B8D1FF"
          height={2.126}
          rx={1.063}
          transform="rotate(-22.655 59.94 72.613)"
          width={8.504}
          x={59.94}
          y={72.613}
        />
        <rect
          fill="#B8D1FF"
          height={2.126}
          rx={1.063}
          transform="rotate(-112.655 64.93 76.29)"
          width={8.504}
          x={64.93}
          y={76.29}
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="no_data__prefix__paint0_linear"
            x1={131.048}
            x2={131.048}
            y1={133.286}
            y2={163.147}
          >
            <stop
              stopColor="#B8D1FF"
            />
            <stop
              offset={1}
              stopColor="#fff"
              stopOpacity={0.453}
            />
            <stop
              offset={1}
              stopColor="#fff"
            />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="no_data__prefix__paint1_linear"
            x1={130}
            x2={130}
            y1={62.5}
            y2={137.5}
          >
            <stop
              stopColor="#B8D1FF"
            />
            <stop
              offset={1}
              stopColor="#698FFF"
            />
          </linearGradient>
        </defs>
      </svg>
    `);
  });

  it('has a no result image', () => {
    const tree = TestRenderer.create(<NoResultImage />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <svg
        aria-labelledby="title"
        fill="none"
        role="img"
        viewBox="0 0 260 166"
      >
        <title
          id="title"
        >
          No result image
        </title>
        <circle
          cx={70.67}
          cy={105.812}
          r={3.506}
          stroke="#B8D1FF"
          strokeWidth={2}
        />
        <circle
          cx={191.004}
          cy={67.49}
          fill="#B8D1FF"
          r={3.004}
        />
        <rect
          fill="#B8D1FF"
          height={3.004}
          rx={1.502}
          width={12.015}
          x={61}
          y={25.992}
        />
        <rect
          fill="#B8D1FF"
          height={3.004}
          rx={1.502}
          transform="rotate(-90 65.506 33.502)"
          width={12.015}
          x={65.506}
          y={33.502}
        />
        <rect
          fill="url(#no_result__prefix__paint0_linear)"
          height={117.145}
          rx={4}
          width={84.198}
          x={87.838}
        />
        <rect
          fill="#fff"
          fillOpacity={0.9}
          height={4.881}
          rx={2.441}
          width={34.167}
          x={104.296}
          y={18.925}
        />
        <rect
          fill="#fff"
          fillOpacity={0.9}
          height={5}
          rx={2.5}
          width={57}
          x={104}
          y={31.486}
        />
        <rect
          fill="#fff"
          fillOpacity={0.9}
          height={5}
          rx={2.5}
          width={57}
          x={104}
          y={43.486}
        />
        <path
          d="M114.492 97.562l43.943-33.899 5.498 7.127-43.944 33.898zM104.228 89.642l49.056-37.846 5.497 7.126-49.055 37.846z"
          fill="#fff"
          opacity={0.4}
        />
        <circle
          cx={131.746}
          cy={73.444}
          opacity={0.8}
          r={31.505}
          stroke="#B4B9CA"
          strokeWidth={5}
          transform="rotate(-41.712 131.746 73.444)"
        />
        <rect
          fill="#DFE4EE"
          height={12.091}
          rx={2}
          transform="rotate(-41.712 152.836 102.783)"
          width={9.068}
          x={152.836}
          y={102.783}
        />
        <rect
          fill="#88A6FF"
          height={10.579}
          rx={2}
          transform="rotate(-41.712 145.551 99.153)"
          width={15.114}
          x={145.551}
          y={99.153}
        />
        <rect
          fill="#88A6FF"
          height={23.009}
          rx={3}
          transform="rotate(-41.712 157 111.543)"
          width={15.114}
          x={157}
          y={111.543}
        />
        <path
          d="M153.531 50.535c11.577 12.99 10.433 32.905-2.556 44.482-12.989 11.578-32.905 10.434-44.482-2.555-11.578-12.99-10.433-32.905 2.556-44.483 12.989-11.577 32.904-10.433 44.482 2.556z"
          stroke="#DFE4EE"
          strokeWidth={5}
        />
        <path
          d="M0 165.136c102.866-40.07 159.923-39.57 260 0H0z"
          fill="url(#no_result__prefix__paint1_linear)"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="no_result__prefix__paint0_linear"
            x1={122.5}
            x2={143.5}
            y1={-43}
            y2={102.5}
          >
            <stop
              stopColor="#5F87FF"
            />
            <stop
              offset={1}
              stopColor="#F0F5FF"
            />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="no_result__prefix__paint1_linear"
            x1={131.048}
            x2={131.048}
            y1={135.275}
            y2={165.136}
          >
            <stop
              stopColor="#B8D1FF"
            />
            <stop
              offset={1}
              stopColor="#fff"
              stopOpacity={0.453}
            />
            <stop
              offset={1}
              stopColor="#fff"
            />
          </linearGradient>
        </defs>
      </svg>
    `);
  });
});
