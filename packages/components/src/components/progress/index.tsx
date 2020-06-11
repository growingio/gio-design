import * as React from 'react';
import { Progress as AtndProgress } from 'antd';

interface PropsType {
  format?: (percent: number) => string;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  percent?: number;
  showInfo?: boolean;
  status?: 'success' | 'exception' | 'active';
  strokeWidth?: number;
  type?: 'line' | 'circle' | 'dashboard';
  width?: number;
}

const Progress = (props: PropsType) => <AtndProgress {...props} />;
export default Progress;
