import React from 'react';
import { Tag } from '@gio-design/components';
import '@gio-design/components/es/components/tag/style/index.css';
import './index.less';

const Prorupts = () => (
  <>
    <Tag className="tag" type="prorupt" status="success">
      正常
    </Tag>
    <Tag className="tag" type="prorupt" status="warning">
      不确定
    </Tag>
    <Tag className="tag" type="prorupt" status="error">
      错误
    </Tag>
  </>
);

export default Prorupts;
