/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { PlusOutlined, MinusOutlined } from '@gio-design/icons';
import Pagination, { PaginationProps } from '../index';
import '../style';
import Docs from './PaginationPage';
import Button from '../../button';

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

export const ShowQuickJumper = DefaultTemplate.bind({});
ShowQuickJumper.args = {
  total: 100,
  showQuickJumper: true,
} as Partial<PaginationProps>;

export const ShowSizeChanger = DefaultTemplate.bind({});

ShowSizeChanger.args = {
  total: 100,
  showSizeChanger: true,
} as Partial<PaginationProps>;

export const HideOnSinglePage = () => {
  const [currentPage, setCurrentPage] = useState(11);

  const handleChange = (
    page: number,
    pageSize: number,
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement> | null
  ) => {
    console.log(pageSize, event);
    setCurrentPage(page);
  };
  const decrease = () => setCurrentPage(currentPage - 1 || 0);
  const increase = () => setCurrentPage(currentPage + 1 || 0);

  return (
    <>
      <Button.IconButton onClick={decrease} type="text">
        <MinusOutlined />
      </Button.IconButton>
      <Button.IconButton onClick={increase} type="text">
        <PlusOutlined />
      </Button.IconButton>
      大于1页时显示，小于则隐藏，(defaultPageSize)参数默认为10
      <Pagination total={currentPage} onChange={handleChange} hideOnSinglePage />
    </>
  );
};

export const Basic = () => <Pagination total={100} />;

export const FirstLastButtons = () => (
  <>
    <Pagination total={100} hideFirstButton hideLastButton />
  </>
);

export const PageSize = () => {
  const [pageSize, setPageSize] = useState(20);

  const handlePageSizeChange = (currentPageSize: number, previousPageSize: number) => {
    setPageSize(currentPageSize);
    action('onPageSizeChange');
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

export const OnChange = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  return (
    <Pagination
      total={100}
      current={currentPage}
      pageSize={pageSize}
      onChange={(page) => {
        setCurrentPage(page);
        action('onChange');
        console.log(page);
      }}
    />
  );
};
