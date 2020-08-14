import React from 'react';
import { Tag } from '@gio-design/components';
import '@gio-design/components/es/components/tag/style/index.css';
import './index.less';

const Basics = () => (
  <>
    <Tag className="tag_website_demo_tag" color="beta" size="small">
      Beta
    </Tag>
    <Tag className="tag_website_demo_tag" color="new" size="small">
      New
    </Tag>
    <Tag className="tag_website_demo_tag" color="grayscale" size="small">
      灰度
    </Tag>
  </>
);

export default Basics;
