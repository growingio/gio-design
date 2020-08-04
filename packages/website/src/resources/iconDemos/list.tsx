/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import * as GIOIcons from '@gio-design/icons';

const allIcons: {
  [key: string]: any;
} = GIOIcons;

export default () => (
  <>
    {Object.keys(GIOIcons).map((key: string) => (
      <span
        key={key}
        style={{
          display: 'inline-block',
          margin: '0 10px 15px 0',
          width: '23%',
          padding: '5px 15px',
          background: '#FAFAFA',
        }}
      >
        {React.createElement(allIcons[key])}
        <span
          style={{
            fontSize: 12,
            color: '#999',
            marginLeft: 6,
          }}
        >
          {key}
        </span>
      </span>
    ))}
  </>
);
