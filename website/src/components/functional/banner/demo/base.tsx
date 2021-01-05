import React from 'react';
import Banner from '@gio-design/components/es/components/banner';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/banner/style/index.css';

const normalContent = (
  <div className="alert-close">
    【GrowingIO在线公共课】欧治云商运营负责人复盘B2B增长实践
    <Button type="secondary" size="small" style={{ margin: '0 0 0 8px' }}>
      立即报名
    </Button>
  </div>
);

export default () => <Banner content={normalContent} type="normal" closeable={true} />;
