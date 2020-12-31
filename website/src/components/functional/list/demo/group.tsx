import React from 'react';
import { List } from '@gio-design/components';

const options = [
  { groupValue: 'events', groupLabel: '选择事件', value: 'a', label: '选择事件a' },
  { groupValue: 'events', groupLabel: '选择事件', value: 'b', label: '选择事件b' },
  { groupValue: 'dimensions', groupLabel: '选择维度', value: 'c', label: '选择维度c' },
  { groupValue: 'dimensions', groupLabel: '选择维度', value: 'd', label: '选择维度d' },
];

const WrapperStyle = {
  // padding: '0 8px 10px',
  display: 'inline-block',
  borderRadius: 6,
  backgroundColor: '#FFFFFF',
  boxShadow: '0 2px 14px 1px rgba(223,226,237,0.8)',
};

export default () => (
  <>
    <div style={WrapperStyle}>
      <List dataSource={options} width={170} />
    </div>
    <div style={{ display: 'inline-block', width: 20 }} />
    <div style={WrapperStyle}>
      <List
        dataSource={options}
        width={170}
        isMultiple
        value={['a', 'c']}
        onSelect={() => console.log.bind(null, 'onSelect')}
        onDeselect={() => console.log.bind(null, 'onDeselect')}
        onChange={console.log}
      />
    </div>
  </>
);
