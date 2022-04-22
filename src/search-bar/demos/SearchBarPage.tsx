import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import SearchBar from '../index';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Search Bar 搜索框' })}</Title>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4078%3A43861"
      />
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      {/* <Canvas>
        <Story id="upgraded-searchbar--demo" />
      </Canvas> */}

      <Subheading>{formatMessage({ defaultMessage: '基础使用' })}</Subheading>
      <Canvas>
        <Story id="upgraded-searchbar--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '禁用状态' })}</Subheading>

      <Canvas>
        <Story id="upgraded-searchbar--disabled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '禁用且有值' })}</Subheading>
      <Canvas>
        <Story id="upgraded-searchbar--disable-value" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'onChange 事件' })}</Subheading>
      <Canvas>
        <Story id="upgraded-searchbar--on-search" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={SearchBar} />
    </>
  );
}
