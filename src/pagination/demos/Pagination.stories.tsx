/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Pagination, { PaginationProps } from '../index';
import '../style';
import Docs from './PaginationPage';

export default {
  title: 'Upgraded/Pagination',
  component: Pagination,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4070%3A36365',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const DefaultTemplate: Story<PaginationProps> = (args) => <Pagination {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
  total: 100,
  showQuickJumper: true,
  showSizeChanger: true,
} as Partial<PaginationProps>;

export const Basic = () => <Pagination total={100} />;

export const Buttons = () => (
  <>
    <Pagination total={100} hideFirstButton hideLastButton />
    <br />
    <Pagination total={100} showQuickJumper showSizeChanger />
  </>
);

export const PageSize = () => {
  const [pageSize, setPageSize] = useState(20);

  const handlePageSizeChange = (currentPageSize: number, previousPageSize: number) => {
    setPageSize(currentPageSize);
  };

  return (
    <>
      <Pagination total={100} defaultPageSize={20} />
      <br />
      <Pagination total={100} pageSize={pageSize} onPageSizeChange={handlePageSizeChange} showSizeChanger />
      <br />
      <Pagination total={100} defaultPageSize={20} pageSizeOptions={[10, 20, 50]} showSizeChanger />
    </>
  );
};

export const Controlled = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (
    page: number,
    pageSize: number,
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement> | null
  ) => {
    console.log(pageSize, event);
    setCurrentPage(page);
  };

  return (
    <>
      <Pagination total={100} current={currentPage} onChange={handleChange} />
    </>
  );
};

export const TotalTextRenderer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  return (
    <Pagination
      total={100}
      pageSize={pageSize}
      onChange={(page) => setCurrentPage(page)}
      totalTextRender={(total) => `${(currentPage - 1) * pageSize + 1}-${currentPage * pageSize} of ${total}`}
    />
  );
};
