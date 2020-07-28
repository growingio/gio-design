import React from 'react';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/button/style/css.js';
import Icon from '@gio-design/icon';
import './index.less';

export default () => (
  <div className="button-demo">
    <div className="list">
      <div className="item">
        <Button icon={<Icon type="plus-circle" />} size="large" type="text">
          文本按钮
        </Button>
      </div>
      <div className="item">
        <Button
          icon={<Icon type="plus-circle" />}
          size="large"
          type="text"
          disabled={true}
        >
          文本按钮
        </Button>
      </div>
    </div>
    <div className="list">
      <div className="item">
        <Button icon={<Icon type="plus-circle" />} type="text">
          文本按钮
        </Button>
      </div>
      <div className="item">
        <Button icon={<Icon type="plus-circle" />} type="text" disabled={true}>
          文本按钮
        </Button>
      </div>
    </div>
    <div className="list">
      <div className="item">
        <Button icon={<Icon type="plus-circle" />} size="small" type="text">
          文本按钮
        </Button>
      </div>
      <div className="item">
        <Button
          icon={<Icon type="plus-circle" />}
          size="small"
          type="text"
          disabled={true}
        >
          文本按钮
        </Button>
      </div>
    </div>
  </div>
);
