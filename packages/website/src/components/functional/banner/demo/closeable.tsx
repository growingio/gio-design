import React from 'react';
import Banner from '@gio-design/components/es/components/banner';
import { Tag, Button } from '@gio-design/components';
import '@gio-design/components/es/components/banner/style/index.css';

const normalContent = (
  <>
    <Tag color="beta" size="small" style={{ margin: '0 8px 0 0' }}>
      试用中
    </Tag>
    <span>试用14天后结束</span>
    <span style={{ float: 'right', margin: '0 8px 0 0' }}>客服专线：010-50914714</span>
  </>
);
const button = (
  <Button type="secondary" size="small">
    商务咨询
  </Button>
);

export default () => <Banner content={normalContent} type="normal" closeable={false} button={button} />;
