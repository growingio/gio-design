import React from 'react';
import { Canvas, Title, Heading, Subheading, Story, ArgsTable, Description } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Tree from '../Tree';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Tree 树形控件' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '多层次的结构列表。',
        })}
      </Description>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tree--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'disabled 不可选' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`disabled`属性为true时，当前节点不可选 ',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tree--disabled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'defaultExpandAll默认展开树形结构' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`defaultExpandAll`属性为true时，默认展开所有节点 ',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tree--default-expanded-all" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '受控模式，自定义selectedKeys和onSelect' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`selectedKeys`属性接受string数组，`onSelect`返回string数组 ',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tree--selected-keys" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'defaultSelectedKeys 默认选择节点' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`defaultSelectedKeys`属性接受字符数组，每一项对应options的value ',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tree--default-selected-keys" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'expandedKeys & onExpand 控制展开节点' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '`expandedKeys`属性接受字符数组，对应options中的value进行展开控制，`onExpand`参数在展开时触发。 ',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tree--expanded-keys" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'onClick 点击触发' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`onClick`属性在点击时触发，与onSelect区别在于受disabled限制，且返回string不支持多选 ',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tree--on-click" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'multiple' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`multiple`属性为true时，支持多选，在console,查看回调 ',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tree--multiple" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'options' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`options`属性支持传入对象数组，遍历出树结构 ',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tree--options" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'filterTreeNode节点过滤' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`filterTreeNode`属性传入filter函数，过滤出为逻辑为真的节点',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tree--filter-tree-node" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Tree} />
    </>
  );
}
