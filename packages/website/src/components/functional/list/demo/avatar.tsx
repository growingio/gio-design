import React from 'react';
import { List, Avatar } from '@gio-design/components';

import './avatar.less';

const options = [
  { groupValue: 'events', groupLabel: '选择事件', value: 'a', label: '选择事件a', description: 'xx@email.com' },
  {
    groupValue: 'events',
    groupLabel: '选择事件',
    value: 'b',
    label: '选择事件b',
    description: 'xx@email.com',
    disabled: true,
  },
  { groupValue: 'dimensions', groupLabel: '选择维度', value: 'c', label: '选择维度c', description: 'xx@email.com' },
  {
    groupValue: 'dimensions',
    groupLabel: '选择维度',
    value: 'd',
    label: '选择维度d',
    description: 'xx@email.com',
    tooltip: 'xtesds',
  },
];

const WrapperStyle = {
  display: 'inline-block',
  borderRadius: 6,
  backgroundColor: '#FFFFFF',
  boxShadow: '0 2px 14px 1px rgba(223,226,237,0.8)',
};

const optionWrapper = {
  display: 'flex',
  alignItems: 'center',
};

const getRowHeight = (option: any) => {
  if (option.type === 'groupLabel') {
    return 34;
  }

  return 60;
};

const labelRenderer = (option: any, isGroup: boolean) => {
  if (isGroup) {
    return option.name;
  }
  return (
    <div style={optionWrapper}>
      <Avatar size="default">L</Avatar>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '7px 0' }}>
        <span className="gio-list-option-title">{option.label}</span>
        <span className="gio-list-option-desc">{option.description}</span>
      </div>
    </div>
  );
};

export default () => (
  <>
    <div style={WrapperStyle} className="gio-list_avatar">
      <List dataSource={options} width={220} labelRenderer={labelRenderer} rowHeight={getRowHeight} />
    </div>
    <div style={{ display: 'inline-block', width: 20 }} />
    <div style={WrapperStyle} className="gio-list_avatar">
      <List
        dataSource={options}
        width={220}
        labelRenderer={labelRenderer}
        rowHeight={getRowHeight}
        isMultiple
        value={['a']}
      />
    </div>
  </>
);
