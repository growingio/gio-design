import React from 'react';

export default {
  jumpTo: (pageInput: React.ReactNode) => (
    <>
      <p>Jump to Page</p>
      {pageInput}
    </>
  ),
  rowsPerPage: (select: React.ReactNode) => (
    <>
      <p>Rows per page</p>
      {select}
    </>
  ),
};
