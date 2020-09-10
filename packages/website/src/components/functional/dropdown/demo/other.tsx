import React from 'react';
import { Dropdown, Button } from '@gio-design/components';
import { More } from '@gio-design/icons';
import '@gio-design/components/es/components/dropdown/style/index.css';

export default () => (
  <Dropdown overlay={<div style={{ width: 200 }}>11111</div>}>
    <Button type="assist" icon={<More />} />
  </Dropdown>
);
