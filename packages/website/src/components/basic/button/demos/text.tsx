import React from 'react';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/button/style/css.js';
import Icon from '@gio-design/icon';
import './index.less';

export default () => (
  <div className="button-demo">
    <div className="list">
      <div className="item">
        <Button size="large" type="text">
          文本按钮
        </Button>
      </div>
      <div className="item">
        <Button size="large" type="text" disabled={true}>
          文本按钮
        </Button>
      </div>
    </div>
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
    <div className="list">
      <div className="item">
        <Button size="small" type="text">
          文本按钮
        </Button>
      </div>
      <div className="item">
        <Button size="small" type="text" disabled={true}>
          文本按钮
        </Button>
      </div>
    </div>
  </div>
);
