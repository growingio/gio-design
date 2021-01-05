import React from 'react';
import { Tag } from '@gio-design/components';
import '@gio-design/components/es/components/tag/style/index.css';
import './index.less';

const Closable = () => (
  <>
    <Tag className="tag_website_demo_tag" closable={true}>
      控件内的过滤条件
    </Tag>
    <Tag className="tag_website_demo_tag" type="prorupt" closable={true} persistCloseIcon={true}>
      控件内的过滤条件
    </Tag>
    <Tag className="tag_website_demo_tag" size="large" closable={true}>
      控件内的过滤条件
    </Tag>
  </>
);

export default Closable;
