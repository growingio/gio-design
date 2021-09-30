import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Dropdown from '../index';

export default function DropdownPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Dropdown 下拉菜单' })}</Title>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="navigation-dropdown--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Icon' })}</Subheading>
      <Canvas>
        <Story id="navigation-dropdown--icon-trigger" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Dropdown} />
    </>
  );
}
