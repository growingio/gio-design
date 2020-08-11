import React from 'react';
import { Popconfirm, Button } from '@gio-design/components';
import '@gio-design/components/es/components/popconfirm/style/index.css';
import './index.less';

export default () => (
  <div className="popconfirmDisplay">
    <Popconfirm title="确定要删除……吗？" desc="删除物品属性后，相关数据将停止计算，历史数据保留。" placement="bottom">
      <Button>click me</Button>
    </Popconfirm>
    <Popconfirm title="删除物品属性后，相关数据将停止计算，历史数据保留。" placement="bottom">
      <Button>click me</Button>
    </Popconfirm>
  </div>
);
