import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Dropdown from '../index';

export default function DropdownPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Dropdown 下拉菜单' })}</Title>
      <p>下拉菜单在UI上上显示选择列表，通过选择列表来选择菜单中的操作或导航。</p>
      <p>
        虽然样式上和 select 很相似，但下拉菜单的列表中所装载的为操作，而非让用户选择，其触发器为按钮且不会更变按钮文案。
      </p>
      Dropdown Menu 的宽度为固定，可以设置，默认为160px。
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-dropdown--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'demo' })}</Subheading>
      <Canvas>
        <Story id="upgraded-dropdown--demo" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Dropdown} />
    </>
  );
}
