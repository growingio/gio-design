import { DownFilled } from '@gio-design/icons';
import React, { useContext } from 'react';
import { usePrefixCls } from '@gio-design/utils';
import Checkbox from '../checkbox/Checkbox';
import { BaseItem } from '../list';
import { PREFIX } from '../list/constants';
import { renderIcon } from '../list/inner/baseItem';
import Content from '../list/inner/Content';
import { TreeContext } from './context';
import { TreeItemProps } from './interface';

const TreeNode: React.FC<TreeItemProps> = (props) => {
  const { label, level = 0, value, disabled, isLeaf, isOpen, children, ...rest } = props;
  const option = { label, value, isLeaf, isOpen, disabled };
  const { onClick: contextClick, onSelect, onExpand, multiple, selectedKeys } = useContext(TreeContext);

  const prefixCls = `${usePrefixCls(PREFIX)}--item`;
  const prefixIcon = rest?.prefix ? renderIcon(`${prefixCls}-prefix-icon`, rest?.prefix) : undefined;
  const suffixIcon = rest?.suffix ? renderIcon(`${prefixCls}-prefix-icon`, rest?.suffix) : undefined;

  const onClick = (
    _value?: string | number,
    event?: React.MouseEvent<HTMLLIElement | HTMLInputElement, MouseEvent>
  ) => {
    if (!disabled) {
      contextClick?.(_value, event);
      onSelect?.(option);
      event?.stopPropagation();
    }
  };

  const onNodeExpand = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    !isLeaf && onExpand?.(option);
    e.stopPropagation();
  };

  const generateIndent = () => {
    const indent: React.ReactElement[] = [];
    for (let i = 0; i < level; i += 1) {
      indent.push(<span key={i} className={`${prefixCls}-depth`} />);
    }
    return indent;
  };

  const content = (
    <>
      {generateIndent()}
      <span aria-hidden="true" onClick={(e) => onNodeExpand(e)} className={`${prefixCls}-depth`}>
        {!isLeaf ? <DownFilled style={!isOpen ? { transform: 'rotate(-90deg)' } : undefined} /> : undefined}
      </span>
      {multiple && (
        <Checkbox
          checked={selectedKeys?.includes(value)}
          value={value}
          disabled={disabled}
          onClick={(e) => {
            onClick(value, e);
          }}
        />
      )}
      <Content label={label ?? children} prefix={prefixIcon} suffix={suffixIcon} />
    </>
  );

  return (
    <BaseItem {...option} selected={selectedKeys?.includes(value)} disabled={disabled} onClick={onClick} {...rest}>
      {content}
    </BaseItem>
  );
};

export default TreeNode;
