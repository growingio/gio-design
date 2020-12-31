import React from 'react';
import { Button, Dropdown, List } from '@gio-design/components';
import { MoreOutlined } from '@gio-design/icons';

const options = [
  { value: 'a', label: '功能名称' },
  { value: 'c', label: '功能名称' },
];

export default () => (
  <>
    <Dropdown overlay={<List dataSource={options} width={144} height={88} />} placement="bottomRight">
      <Button type="assist" icon={<MoreOutlined />} style={{ marginLeft: '64px' }} />
    </Dropdown>
    <Dropdown overlay={<List dataSource={options} width={144} height={88} />} placement="bottom">
      <Button type="assist" icon={<MoreOutlined />} style={{ margin: '0px 128px' }} />
    </Dropdown>
    <Dropdown overlay={<List dataSource={options} width={144} height={88} />} placement="bottomLeft">
      <Button type="assist" icon={<MoreOutlined />} />
    </Dropdown>
  </>
);
