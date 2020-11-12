import React from 'react';
import List, { DragList } from '@gio-design/components/es/components/list';

const options = [
  { value: 'a', label: '选择事件a' },
  { value: 'b', label: '选择事件b' },
  { value: 'c', label: '选择事件c' },
  { value: 'd', label: '选择事件d' },
];

const WrapperStyle = {
  // padding: '5px 8px',
  display: 'inline-block',
  borderRadius: 6,
  backgroundColor: '#FFFFFF',
  boxShadow: '0 2px 14px 1px rgba(223,226,237,0.8)',
};

export default () => (
  <div style={WrapperStyle}>
    <DragList dataSource={options} height={166} width={260} />
  </div>
);
