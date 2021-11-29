import React from 'react';

export default {
  jumpTo: (pageInput: React.ReactNode) => (
    <>
      <p>跳至</p>
      {pageInput}
      <p>页</p>
    </>
  ),
  rowsPerPage: (select: React.ReactNode) => (
    <>
      <p>每页展示</p>
      {select}
      <p>页</p>
    </>
  ),
};
