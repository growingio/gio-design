/* eslint-disable */
import * as React from 'react';
import RcTreeSelect, { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from 'rc-tree-select';
import classNames from 'classnames';
import omit from 'omit.js';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import devWarning from '../../utils/devWarning';
import { GioTreeNodeProps } from '../tree';
import getIcons from '../../utils/iconUtil';
import renderSwitcherIcon from '../tree/iconUtil';
import SizeContext from '../config-provider/SizeContext';
import { TreeSelectProps } from './interface';

class TreeSelect<T> extends React.Component<TreeSelectProps<T>, {}> {
  public static TreeNode = TreeNode;

  public static SHOW_ALL: typeof SHOW_ALL = SHOW_ALL;

  public static SHOW_PARENT: typeof SHOW_PARENT = SHOW_PARENT;

  public static SHOW_CHILD: typeof SHOW_CHILD = SHOW_CHILD;

  public static defaultProps = {
    transitionName: 'slide-up',
    choiceTransitionName: '',
    bordered: true,
  };

  public selectRef: any = React.createRef<RcTreeSelect>();

  public constructor(props: TreeSelectProps<T>) {
    super(props);

    devWarning(
      props.multiple !== false || !props.treeCheckable,
      'TreeSelect',
      '`multiple` will alway be `true` when `treeCheckable` is true'
    );
  }

  public focus() {
    this.selectRef.current && this.selectRef.current.focus();
  }

  public blur() {
    if (this.selectRef.current) {
      this.selectRef.current.blur();
    }
  }

  public renderTreeSelect = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    virtual,
    dropdownMatchSelectWidth,
  }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      size: customizeSize,
      className,
      treeCheckable,
      multiple,
      listHeight = 368,
      listItemHeight = 26,
      notFoundContent,
      switcherIcon,
      getPopupContainer,
      dropdownClassName,
      bordered,
    } = this.props;

    const prefixCls = getPrefixCls('select', customizePrefixCls);
    const treePrefixCls = getPrefixCls('select-tree', customizePrefixCls);
    const treeSelectPrefixCls = getPrefixCls('tree-select', customizePrefixCls);

    const mergedDropdownClassName = classNames(dropdownClassName, `${treeSelectPrefixCls}-dropdown`);

    const isMultiple = !!(treeCheckable || multiple);

    // ===================== Icons =====================
    const { suffixIcon, removeIcon, clearIcon } = getIcons({
      ...this.props,
      multiple: isMultiple,
      prefixCls,
    });

    // ===================== Empty =====================
    let mergedNotFound: React.ReactNode;
    if (notFoundContent !== undefined) {
      mergedNotFound = notFoundContent;
    } else {
      mergedNotFound = <div className={`${treeSelectPrefixCls}-search-empty`}>无搜索结果...</div>;
    }

    // 'itemIcon',
    // ==================== Render =====================
    const selectProps = omit(this.props, [
      'prefixCls',
      'suffixIcon',
      'removeIcon',
      'clearIcon',
      'switcherIcon',
      'size',
      'bordered',
    ]);

    return (
      <SizeContext.Consumer>
        {(size) => {
          const mergedSize = customizeSize || size;
          const mergedClassName = classNames(
            !customizePrefixCls && treeSelectPrefixCls,
            {
              [`${prefixCls}-large`]: mergedSize === 'large',
              [`${prefixCls}-small`]: mergedSize === 'small',
              [`${prefixCls}-borderless`]: !bordered,
            },
            className
          );

          return (
            <RcTreeSelect
              virtual={virtual}
              dropdownMatchSelectWidth={dropdownMatchSelectWidth}
              {...selectProps}
              ref={this.selectRef}
              prefixCls={prefixCls}
              className={mergedClassName}
              listHeight={listHeight}
              listItemHeight={listItemHeight}
              treeCheckable={treeCheckable ? <span className={`${prefixCls}-tree-checkbox-inner`} /> : treeCheckable}
              inputIcon={suffixIcon}
              removeIcon={removeIcon}
              clearIcon={clearIcon}
              switcherIcon={(nodeProps: GioTreeNodeProps) => renderSwitcherIcon(treePrefixCls, switcherIcon, nodeProps)}
              showTreeIcon={false}
              notFoundContent={mergedNotFound}
              getPopupContainer={getPopupContainer || getContextPopupContainer}
              treeMotion={null}
              dropdownClassName={mergedDropdownClassName}
            />
          );
        }}
      </SizeContext.Consumer>
    );
  };

  public render() {
    return <ConfigConsumer>{this.renderTreeSelect}</ConfigConsumer>;
  }
}

export { TreeNode };

export default TreeSelect;
