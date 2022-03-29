import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import TreeSelect from '../TreeSelect';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'TreeSelect 树形选择器' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '树型选择控件。(该组件需要重写目前不建议使用)',

        })}
      </Description>
      <Subtitle>
        {formatMessage({
          defaultMessage: '使用场景',
        })}
      </Subtitle>
      <Description>{formatMessage({
        defaultMessage: '类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司部门，组织架构、学科系统、分类目录等等',
      })}</Description>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本' })}</Subheading>
      <Canvas>
        <Story id="upgraded-treeselect--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多选' })}</Subheading>
      <Canvas>
        <Story id="upgraded-treeselect--multiple" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={TreeSelect} />
    </>
  );
}
