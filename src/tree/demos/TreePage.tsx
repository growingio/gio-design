import React from 'react';
import { Canvas, Title, Heading, Subheading, Story, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Tree from '../Tree';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Tree 树形控件' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '多层次的结构列表。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tree--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '带 Icon 的树形控件' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tree--icon-tree" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Tree} />
    </>
  );
}
