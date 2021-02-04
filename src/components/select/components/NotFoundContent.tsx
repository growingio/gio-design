import React from 'react';
import BoxFilled from '../Empty';

const DefaultNotFoundContent = () => {
  return (
    <div
      className="not-found-context"
      style={{
        width: '100%',
        textAlign: 'center',
        color: '#a3adc8',
        padding: '68px 0',
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <BoxFilled />
      </div>
      <div style={{ fontSize: 12 }}>暂无选项</div>
    </div>
  );
};

export default DefaultNotFoundContent;
