import React from 'react';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/button/style/css.js';
import './index.less';

export default () => (
  <div className="button-demo">
    <div className="list list-border">
      <div className="item">
        <Button block={true} type="primary">
          块按钮
        </Button>
      </div>
      <div className="item">
        <Button block={true} type="secondary">
          块按钮
        </Button>
      </div>
      <div className="item">
        <Button block={true} type="assist">
          块按钮
        </Button>
      </div>
    </div>
  </div>
);
