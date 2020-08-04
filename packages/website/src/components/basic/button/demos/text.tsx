import React from 'react';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/button/style/css.js';
import './index.less';

export default () => (
  <div className="button-demo">
    <div className="list">
      <div className="item">
        <Button type="text">文本按钮</Button>
      </div>
      <div className="item">
        <Button type="text" disabled={true}>
          文本按钮
        </Button>
      </div>
    </div>
    <div className="list" style={{ backgroundColor: '#313E75' }}>
      <div className="item">
        <Button ghost={true} type="text">
          深色背景
        </Button>
      </div>
      <div className="item">
        <Button type="text" disabled={true} ghost={true}>
          深色背景
        </Button>
      </div>
    </div>
  </div>
);
