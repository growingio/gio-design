import React from 'react';
import { Loading } from '@gio-design/components';
import Tabs from '../../tabs/demo/block.tsx';
import '@gio-design/components/es/components/loading/style/index.css';
import './index.less';

export default () => (
  <Loading titlePosition="right" blurColor="black">
    <Tabs />
  </Loading>
);
