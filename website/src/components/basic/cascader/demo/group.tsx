import React, { useState } from 'react';
import { Cascader, Toggles, Grid } from '@gio-design/components';

import '@gio-design/components/es/components/cascader/style/index.css';
import '@gio-design/components/es/components/input/style/index.css';

const dataSource = [
  { label: 'option A-1', value: 'a-1', groupId: 'a', groupName: '节能' },
  { label: 'option A-2', value: 'a-2', groupId: 'a' },
  { label: 'option B-1', value: 'b-1', groupId: 'b', groupName: '哈哈' },
  { label: 'option B-2', value: 'b-2', groupId: 'b' },
];

const Basic = (): JSX.Element => {
  const [groupName, setGroupName] = useState(true);

  return (
    <div>
      <Grid>
        <Toggles checked={groupName} onChange={setGroupName} />
        <span> 显示分组名</span>
      </Grid>

      <Cascader dataSource={dataSource} groupName={groupName} />
    </div>
  );
};

export default Basic;
