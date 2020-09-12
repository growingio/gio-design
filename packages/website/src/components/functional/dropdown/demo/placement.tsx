import React from 'react';
import { Button, Dropdown, List } from '@gio-design/components';
import { More } from '@gio-design/icons';

const options = [
  { value: 'a', label: '功能名称' },
  { value: 'c', label: '功能名称' },
];

export default () => (
  <>
    <Dropdown visible overlay={<List dataSource={options} width={144} height={88} />} placement="bottomRight">
      <Button type="assist" icon={<More />} style={{ marginLeft: '64px' }} />
    </Dropdown>
    <Dropdown visible overlay={<List dataSource={options} width={144} height={88} />} placement="bottom">
      <Button type="assist" icon={<More />} style={{ margin: '0px 128px' }} />
    </Dropdown>
    <Dropdown visible overlay={<List dataSource={options} width={144} height={88} />} placement="bottomLeft">
      <Button type="assist" icon={<More />} />
    </Dropdown>
  </>
);
