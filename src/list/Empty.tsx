import React from 'react';
import Page from '../page';
import { collectOptions } from './util';

const Empty: React.FC<any> = ({ children }) => {
  const options = collectOptions(children);
  if (options.length === 0) {
    return (
      <div style={{ width: '100%', padding: '30px 0' }}>
        <Page type="noData" description="暂无数据" size="small" />
      </div>
    );
  }
  return children;
};

export default Empty;
