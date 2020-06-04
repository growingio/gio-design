import * as React from 'react';
import { Pagination as AtndPagination } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import classnames from 'classnames';
import 'antd/lib/pagination/style/index.css';
import './custom-style.less';

export interface PropsType extends PaginationProps {
  type?: 'primary';
  size?: 'large';
}

const Pagination = (props: PropsType) => (
  <AtndPagination
    {...props}
    className={classnames('gio-pagination', `gio-pagination-${props.type}`, props.className)}
  />
);
export default Pagination;
