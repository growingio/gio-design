import React from 'react';
import { Tag } from '@gio-design/components';
import '@gio-design/components/es/components/tag/style/index.css';
import './index.less';

const Basics = () => (
  <>
    <Tag className="tag" color="beta">
      Beta
    </Tag>
    <Tag className="tag" color="new">
      New
    </Tag>
    <Tag className="tag" color="grayscale">
      灰度
    </Tag>
  </>
);

export default Basics;
