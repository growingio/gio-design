import React, { useState } from 'react';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/button/style/css.js';
import Icon from '@gio-design/icon';
import './index.less';

export default () => (
  <div className="button-demo">
    <div className="list">
      <div className="item">
        <Button type="secondary" size="large">
          次要按钮
        </Button>
      </div>
      <div className="item">
        <Button type="secondary" disabled={true} size="large">
          禁用
        </Button>
      </div>
    </div>
    <div className="list">
      <div className="item">
        <Button type="secondary">次要按钮</Button>
      </div>
      <div className="item">
        <Button type="secondary" disabled={true}>
          禁用
        </Button>
      </div>
    </div>
    <div className="list">
      <div className="item">
        <Button type="secondary" size="small">
          次要按钮
        </Button>
      </div>
      <div className="item">
        <Button type="secondary" disabled={true} size="small">
          禁用
        </Button>
      </div>
    </div>
    <div className="list">
      <div className="item">
        <Button type="secondary" icon={<Icon type="filter" />} />
      </div>
      <div className="item">
        <Button
          type="secondary"
          disabled={true}
          icon={<Icon type="filter" />}
        />
      </div>
    </div>
  </div>
);
