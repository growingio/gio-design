import * as React from 'react';
// import classNames from 'classnames';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import FileOutlined from '@ant-design/icons/FileOutlined';
import MinusSquareOutlined from '@ant-design/icons/MinusSquareOutlined';
import PlusSquareOutlined from '@ant-design/icons/PlusSquareOutlined';
import CaretDownFilled from '@ant-design/icons/CaretDownFilled';
import { AntTreeNodeProps } from './Tree';
// import { isValidElement, cloneElement } from '../../_util/reactNode';

interface Options {
  prefixCls: string;
  switcherIcon: React.ReactNode | null | undefined;
  showLine: boolean | { showLeafIcon: boolean } | undefined;
  nodeProps: AntTreeNodeProps;
}

export default function renderSwitcherIcon(options: Options) {
  const { prefixCls, switcherIcon, showLine, nodeProps } = options;
  if (nodeProps.loading) {
    return <LoadingOutlined className={`${prefixCls}-switcher-loading-icon`} />;
  }
  let showLeafIcon;
  if (showLine && typeof showLine === 'object') {
    showLeafIcon = showLine.showLeafIcon;
  }
  if (nodeProps.isLeaf) {
    if (showLine) {
      if (typeof showLine === 'object' && !showLeafIcon) {
        return <span className={`${prefixCls}-switcher-leaf-line`} />;
      }
      return <FileOutlined className={`${prefixCls}-switcher-line-icon`} />;
    }
    return null;
  }
  const switcherCls = `${prefixCls}-switcher-icon`;
  // if (isValidElement(switcherIcon)) {
  //   return cloneElement(switcherIcon, {
  //     className: classNames((switcherIcon as any).props.className || '', switcherCls),
  //   });
  // }

  if (switcherIcon) {
    return switcherIcon;
  }

  if (showLine) {
    if (nodeProps.expanded) {
      return <MinusSquareOutlined className={`${prefixCls}-switcher-line-icon`} />;
    }
    return <PlusSquareOutlined className={`${prefixCls}-switcher-line-icon`} />;
  }
  return <CaretDownFilled className={switcherCls} />;
}
