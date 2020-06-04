import React from 'react';
import Icon from '@gio-design/icon';
import icons from '@gio-design/icon/dist/icons.json';

export default () => (
  <>
    {Object.keys(icons).map(category => {
      return (
        <div key={category}>
          <h3>{category}</h3>
          {
            icons[category].sort().map((i: string) => (
              <span key={`${category}-${i}`} style={{ display: 'inline-block', margin: '0 10px 15px 0', width: '23%', padding: '5px 15px', background: '#FAFAFA' }}>
                <Icon type={i} size='large' style={{ marginRight: 10 }} />
                <span style={{ fontSize: 12, color: '#999' }}>{i}</span>
              </span>
            ))
          }
        </div>
      );
    })}
  </>
);
