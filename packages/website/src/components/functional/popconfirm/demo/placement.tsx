import React from 'react';
import { Popconfirm, Button } from '@gio-design/components';
import '@gio-design/components/es/components/popconfirm/style/index.css';
import './index.less';

const props = {
  title: '确定要删除……吗？',
  desc: '删除物品属性后，相关数据将停止计算，历史数据保留。',
  trigger: 'click',
  arrowPointAtCenter: true,
};

export default () => (
  <div className="popconfirmDisplay">
    <div className="popconfirm-top">
      <Popconfirm placement="topLeft" {...props} arrowPointAtCenter={false}>
        <Button type="secondary">TopLeft</Button>
      </Popconfirm>
      <Popconfirm placement="top" {...props}>
        <Button type="secondary">Top</Button>
      </Popconfirm>
      <Popconfirm placement="topRight" {...props} arrowPointAtCenter={false}>
        <Button type="secondary">TopRight</Button>
      </Popconfirm>
    </div>

    <div className="popconfirm-left">
      <Popconfirm placement="leftTop" {...props}>
        <Button type="secondary">LeftTop</Button>
      </Popconfirm>
      <Popconfirm placement="left" {...props}>
        <Button type="secondary">Left</Button>
      </Popconfirm>
      <Popconfirm placement="leftBottom" {...props}>
        <Button type="secondary">LeftBottom</Button>
      </Popconfirm>
    </div>
    <div className="popconfirm-right">
      <Popconfirm placement="rightTop" {...props}>
        <Button type="secondary">RightTop</Button>
      </Popconfirm>
      <Popconfirm placement="right" {...props}>
        <Button type="secondary">Right</Button>
      </Popconfirm>
      <Popconfirm placement="rightBottom" {...props}>
        <Button type="secondary">RightBottom</Button>
      </Popconfirm>
    </div>
    <div className="popconfirm-buttom">
      <Popconfirm placement="bottomLeft" {...props} arrowPointAtCenter={false}>
        <Button type="secondary">BottomLeft</Button>
      </Popconfirm>
      <Popconfirm placement="bottom" {...props}>
        <Button type="secondary">Bottom</Button>
      </Popconfirm>
      <Popconfirm placement="bottomRight" {...props} arrowPointAtCenter={false}>
        <Button type="secondary">BottomRight</Button>
      </Popconfirm>
    </div>
  </div>
);
