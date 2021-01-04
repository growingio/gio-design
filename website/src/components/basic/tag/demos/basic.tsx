import React from 'react';
import { Tag } from '@gio-design/components';
import '@gio-design/components/es/components/tag/style/index.css';
import './index.less';

const Basics = () => (
  <>
    <Tag className="tag_website_demo_tag" size="small">
      超管
    </Tag>
    <Tag className="tag_website_demo_tag" status="success" size="small">
      已上线
    </Tag>
    <Tag className="tag_website_demo_tag" status="warning" size="small">
      待上线
    </Tag>
    <Tag className="tag_website_demo_tag" status="draft" size="small">
      草稿
    </Tag>
    <Tag className="tag_website_demo_tag" status="offline" size="small">
      已结束
    </Tag>
  </>
);

export default Basics;
