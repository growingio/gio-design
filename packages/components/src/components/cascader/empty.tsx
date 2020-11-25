import React from 'react';
import { Empty as IconEmpty } from '@gio-design/icons';

type Props = {
  tip?: string;
};

const Empty: React.FC<Props> = ({ tip = '暂无数据' }) => {
  return (
    <div className="cascader-menu-empty">
      <IconEmpty size="60" className="icon-empty" />
      <p className="cascader-menu-empty-tip">{tip}</p>
    </div>
  );
};

export default Empty;
