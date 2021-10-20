import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import ListSelector from '../ListSelector';

export default function ListSelectorPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'ListSelector 选择框' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage:
            '弹出一个下拉菜单给用户选择操作，用于代替原生的选择框。另外，为了和原生选择框名称对齐，简称 Select。',
        })}
      </Description>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="components-listselector--basic" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '分组' })}</Subheading>
      <Canvas>
        <Story id="components-listselector--group" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '空样式' })}</Subheading>
      <Canvas>
        <Story id="components-listselector--empty" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={ListSelector} />
    </>
  );
}
