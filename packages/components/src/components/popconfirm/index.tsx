import * as React from 'react';
import { Popconfirm as AntdPopconfirm } from 'antd';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import 'antd/lib/popconfirm/style/css.js';
import './index.less';

export interface Props {
  cancelText?: string;
  okText?: string;
  okType?: PopconfirmProps['okType'];
  title: PopconfirmProps['title'];
  onCancel?: (event: any) => void;
  onConfirm?: (event: any) => void;
  icon?: React.ReactNode;
  placement?:
    | 'topLeft'
    | 'top'
    | 'topRight'
    | 'leftTop'
    | 'left'
    | 'leftBottom'
    | 'rightTop'
    | 'right'
    | 'rightBottom'
    | 'bottomLeft'
    | 'bottom'
    | 'bottomRight';
  getPopupContainer?: PopconfirmProps['getPopupContainer'];
}

export default class Popconfirm extends React.Component<Props, {}> {
  public static defaultProps: Partial<Props> = {
    cancelText: '取消',
    okText: '确定',
    title: '',
    placement: 'top',
  };

  public render() {
    return <AntdPopconfirm {...this.props} />;
  }
}
