import React from 'react';
import { List } from '@gio-design/components';
import { AppOutlined } from '@gio-design/icons';

const options = [
  { value: 'a', label: '选择事件a' },
  { value: 'b', label: '选择事件b' },
  { value: 'c', label: '选择事件c' },
  { value: 'd', label: '选择事件d' },
];

const WrapperStyle = {
  // padding: '16px 8px 10px',
  display: 'inline-block',
  borderRadius: 6,
  backgroundColor: '#FFFFFF',
  boxShadow: '0 2px 14px 1px rgba(223,226,237,0.8)',
};

const labelRenderer = (option: any, isGroup: boolean) => {
  return (
    <>
      <AppOutlined />
      &nbsp;&nbsp;
      {option.label}
    </>
  );
};

export default () => (
  <div style={WrapperStyle}>
    <List dataSource={options} width={170} labelRenderer={labelRenderer} />
  </div>
);
