import React from 'react';
import { Tag } from '@gio-design/components';
import '@gio-design/components/es/components/tag/style/index.css';
import './index.less';

const onClose = (e: any) => console.log('you have clicked tag');

const HoverClose = () => (
  <>
    <Tag className="tag_website_demo_tag" closable={true} persistCloseIcon={false} onClose={onClose}>
      可删除的标签
    </Tag>
    <Tag className="tag_website_demo_tag" closable={true} disabled>
      可删除的标签
    </Tag>
  </>
);

export default HoverClose;
