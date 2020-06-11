import * as React from 'react';
import { Tag as AntdTag } from 'antd';

export interface PropsType {
  closable?: boolean;
  color?: string;
  children: React.ReactNode;
  afterClose?: () => void;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Tag = (props: PropsType) => <AntdTag {...props} />;

export default Tag;
