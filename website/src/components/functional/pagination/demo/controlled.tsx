import React, { useState } from 'react';
import { Pagination } from '@gio-design/components';
import '@gio-design/components/es/components/pagination/style/index.css';

export default () => {
  const [current, setCurrent] = useState<number>(1);
  return <Pagination total={1100} current={current} onChange={(c) => setCurrent(c)} />;
};
