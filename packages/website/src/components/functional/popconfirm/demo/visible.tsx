import React, { useState } from 'react';
import { Popconfirm, Button } from '@gio-design/components';
import '@gio-design/components/es/components/popconfirm/style/index.css';
import './index.less';

export default () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <Popconfirm
      title="删除物品属性后，相关数据将停止计算，历史数据保留。"
      placement="bottom"
      visible={visible}
      onVisibleChange={(visible: boolean) => {
        setVisible(visible);
      }}
    >
      <Button>click me</Button>
    </Popconfirm>
  );
};
