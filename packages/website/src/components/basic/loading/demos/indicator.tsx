import React from 'react';
import { Loading, Button } from '@gio-design/components';
import { LoadingWhiteOutlined, LoadingBlackOutlined } from '@gio-design/icons';
import '@gio-design/components/es/components/loading/style/index.css';
import '@gio-design/components/es/components/button/style/index.css';
import './index.less';

export default () => (
  <div className="displayBaseLoading">
    <Button
      icon={<Loading titlePosition="right" indicator={<LoadingWhiteOutlined />} title={false} />}
      style={{ lineHeight: 0 }}
    />

    <Button
      disabled
      icon={<Loading titlePosition="right" indicator={<LoadingBlackOutlined />} title={false} />}
      style={{ lineHeight: 0 }}
    />
  </div>
);
