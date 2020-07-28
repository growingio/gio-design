import React from 'react';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/button/style/css.js';
import Icon from '@gio-design/icon';
import './index.less';

export default () => (
  <div className="button-demo">
    <div className="list">
      <div className="item">
        <Button type="assist" size="large">
          辅助按钮
        </Button>
      </div>
      <div className="item">
        <Button type="assist" size="large" disabled={true}>
          禁用
        </Button>
      </div>
    </div>
    <div className="list">
      <div className="item">
        <Button type="assist">辅助按钮</Button>
      </div>
      <div className="item">
        <Button type="assist" disabled={true}>
          禁用
        </Button>
      </div>
    </div>
    <div className="list">
      <div className="item">
        <Button type="assist" size="small">
          辅助按钮
        </Button>
      </div>
      <div className="item">
        <Button type="assist" size="small" disabled={true}>
          禁用
        </Button>
      </div>
    </div>
  </div>
);
