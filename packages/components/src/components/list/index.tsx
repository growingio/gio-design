import * as React from 'react';
import { Table } from 'antd';
import 'antd/lib/table/style/index.css';
import 'antd/lib/pagination/style/index.css';
import './index.less';
import cn from 'classnames';

export interface WithKey {
  key: string;
  [key: string]: any;
}

export interface Props {
  className?: string;
  columns: Array<{
    title?: React.ReactNode;
    dataIndex: string;
    key?: string;
    width?: string | number;
    render?: (text: any, record: WithKey, index: number) => React.ReactNode;
  }>;
  dataSource: any[];
  bordered?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  pagination?: any;
  loading?: boolean | object;
  rowKey?: string | ((record: any, index: number) => string);
  rowSelection?: object;
  onRowClick?: (record: WithKey, index: number, event: any) => void;
  selectRow?: number;
  scroll?: object;
  size?: 'default' | 'middle' | 'small';
  onChange?: (pagination: any, filters: any, sorter: any) => void;
}

export default class List extends React.Component<Props, {}> {
  public static defaultProps: Partial<Props> = {
    columns: [],
    dataSource: [],
    bordered: false,
    header: null,
    footer: null,
    pagination: {},
    loading: false,
    rowKey: 'key',
    rowSelection: undefined,
    scroll: {},
    size: 'default',
    className: undefined,
  };

  public getRowClickHandler = (record: WithKey, index: number, event: any) => {
    if (this.props.onRowClick) {
      this.props.onRowClick(record, index, event);
    }
  };

  public getRowClassName = (_: any, index: number) => {
    if (this.props.selectRow === index) {
      return 'select-row';
    }
    return '';
  };

  public onChange = (pagination: any, filters: any, sorter: any) => {
    if (this.props.onChange) {
      this.props.onChange(pagination, filters, sorter);
    }
  };

  public render() {
    return (
      <div>
        {this.props.header}
        <Table
          className={cn('gio-list', this.props.className)}
          columns={this.props.columns}
          dataSource={this.props.dataSource}
          bordered={this.props.bordered}
          pagination={this.props.pagination}
          loading={this.props.loading}
          rowKey={this.props.rowKey}
          rowSelection={this.props.rowSelection}
          // onRowClick={this.getRowClickHandler}
          onRow={(record, index) => ({
            onClick: (event) => {
              if (this.props.onRowClick) {
                this.props.onRowClick(record, index, event);
              }
            },
          })}
          rowClassName={this.getRowClassName}
          scroll={this.props.scroll}
          size={this.props.size}
          onChange={this.onChange}
        />
        {this.props.footer}
      </div>
    );
  }
}
