import React from 'react';
import { Dropdown, Button } from '@gio-design/components';
import '@gio-design/components/es/components/Dropdown/style/index.css';

export default () => (
  <Dropdown overlay={<div style={{ width: 200 }}>11111</div>}>
    <Button>点击我</Button>
  </Dropdown>
);
