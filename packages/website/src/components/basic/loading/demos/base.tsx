import React from 'react';
import { Loading } from '@gio-design/components';
import '@gio-design/components/es/components/loading/style/index.css';
import './index.less';

export default () => (
  <div className="displayBaseLoading">
    <Loading titlePosition="right" />
    <Loading titlePosition="bottom" />
    <Loading title={false} />
  </div>
);
