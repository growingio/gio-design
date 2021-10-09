import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import SearchBar from '../index';

export default function SearchBarPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Search Bar 搜索框' })}</Title>
      <p>{formatMessage({ defaultMessage: '在所有内容中，通过输入内容的关键信息筛选出某个内容。' })}</p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '默认样式' })}</Subheading>
      <Canvas>
        <Story id="data-input-searchbar--default" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={SearchBar} />
    </>
  );
}
