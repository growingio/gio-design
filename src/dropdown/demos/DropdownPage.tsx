import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Dropdown from '../index';

export default function DropdownPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Dropdown 下拉菜单' })}</Title>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式变化：新版dropdown等下拉菜单拥有更圆润的边框。</li>
        <li>APi变动：包装的Popover，弹出内容更名为content，children包装触发器。</li>
        <li>Dropdown 封装自popover</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例' })}</Subheading>
      <Canvas>
        <Story id="upgraded-dropdown--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-dropdown--default" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Dropdown} />
    </>
  );
}
