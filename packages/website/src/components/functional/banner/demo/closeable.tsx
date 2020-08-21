import React from 'react';
import Banner from '@gio-design/components/es/components/banner';
import { Tag, Button } from '@gio-design/components';
import '@gio-design/components/es/components/banner/style/index.css';

const normalContent = (
  <div>
    <Tag color="beta" size="small" style={{ margin: '0 8px' }}>
      试用中
    </Tag>
    试用14天后结束
  </div>
);
const button = (
  <Button type="secondary" size="small">
    商务咨询
  </Button>
);

export default () => <Banner content={normalContent} type="normal" closeable={false} button={button} />;
