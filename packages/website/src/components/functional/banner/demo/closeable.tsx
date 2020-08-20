import React from 'react';
import Banner from '@gio-design/components/es/components/banner';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/banner/style/index.css';

const normalContent = '试用14天后结束';
const button = (
  <Button type="secondary" size="small">
    商务咨询
  </Button>
);

export default () => <Banner content={normalContent} type="normal" closeable={false} button={button} />;
