import React from 'react';
import Banner from '@gio-design/components/es/components/Banner';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/banner/style/index.css';

const normalContent = '【GrowingIO在线公共课】欧治云商运营负责人复盘B2B增长实践';
const button = (
  <Button type="secondary" size="small">
    立即报名
  </Button>
);

export default () => <Banner content={normalContent} type="normal" closeable={true} button={button} />;
