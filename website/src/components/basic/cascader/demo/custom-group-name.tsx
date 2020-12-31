import '@gio-design/components/es/components/cascader/style/index.css';
import '@gio-design/components/es/components/input/style/index.css';

import React from 'react';

import { Cascader } from '@gio-design/components';

const dataSource = [
  { label: 'option A-1', value: 'a-1', groupId: 'a', groupName: '节能' },
  { label: 'option A-2', value: 'a-2', groupId: 'a' },
  { label: 'option B-1', value: 'b-1', groupId: 'b', groupName: '哈哈' },
  { label: 'option B-2', value: 'b-2', groupId: 'b' },
];

const Basic = (): JSX.Element => {
  const groupNameIcons = { a: '🎃', b: '🎄' };

  return (
    <Cascader
      dataSource={dataSource}
      groupName={(d) => (
        <div role="img" aria-label="groupName icon">
          {groupNameIcons[d[0].groupId]}
        </div>
      )}
    />
  );
};

export default Basic;
