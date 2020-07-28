import React from 'react';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/button/style/css.js';
import Icon from '@gio-design/icon';
import './index.less';

export default () => (
  <div className="button-demo">
    <div className="list" style={{ backgroundColor: '#313E75' }}>
      <div className="item">
        <Button icon={<Icon type="plus-circle" />} ghost={true} type="text">
          幽灵按钮
        </Button>
      </div>
      <div className="item">
        <Button
          icon={<Icon type="plus-circle" />}
          type="text"
          disabled={true}
          ghost={true}
        >
          幽灵按钮
        </Button>
      </div>
    </div>
    <div className="list list-border">
      <div className="item">
        <Button icon={<Icon type="plus-circle" />} block={true} type="primary">
          块按钮
        </Button>
      </div>
      <div className="item">
        <Button icon={<Icon type="plus-circle" />} block={true}>
          块按钮
        </Button>
      </div>
      <div className="item">
        <Button icon={<Icon type="plus-circle" />} block={true} type="assist">
          块按钮
        </Button>
      </div>
    </div>
  </div>
);
