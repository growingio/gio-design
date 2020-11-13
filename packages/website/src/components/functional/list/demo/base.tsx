import React from 'react';
import { List } from '@gio-design/components';

const options = [
  { value: 'a', label: '选择事件a' },
  { value: 'b', label: '选择事件b', tooltip: 'test', disabled: true },
  { value: 'c', label: '选择事件c' },
  { value: 'd', label: '选择事件d', disabled: true },
];

const WrapperStyle = {
  // padding: '12px 8px',
  display: 'inline-block',
  borderRadius: 6,
  backgroundColor: '#FFFFFF',
  boxShadow: '0 2px 14px 1px rgba(223,226,237,0.8)',
};

export default () => (
  <div style={WrapperStyle}>
    <List stateless dataSource={options} height={176} width={170} onClick={console.log} />
  </div>
);
