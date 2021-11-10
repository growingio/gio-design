import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import TreeSelect from '../TreeSelect';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'TreeSelect 树形选择器' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '当选择的内容为树形结构时，选用 TreeSelect。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="legacy-treeselect--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多选' })}</Subheading>
      <Canvas>
        <Story id="legacy-treeselect--multiple" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={TreeSelect} />
    </>
  );
}
