import React from 'react';
import { Tag } from '@gio-design/components';
import '@gio-design/components/es/components/tag/style/index.css';
import './index.less';

const onClose = (e: any) => console.log('you have clicked tag');

const Closable = () => (
  <>
    <Tag className="tag_website_demo_tag" closable={true} persistCloseIcon={true} onClose={onClose}>
      控件内的过滤条件
    </Tag>
    <Tag className="tag_website_demo_tag" color="blue" closable={true} persistCloseIcon={true} onClose={onClose}>
      控件内的过滤条件
    </Tag>
    <Tag className="tag_website_demo_tag" type="large" closable={true} persistCloseIcon={true} onClose={onClose}>
      控件内的过滤条件
    </Tag>
  </>
);

export default Closable;
