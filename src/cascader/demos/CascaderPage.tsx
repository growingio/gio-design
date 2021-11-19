import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';

import { useIntl } from 'react-intl';
import Cascader from '../index';

export default function ButtonPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Cascader 级联选择器' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '级联选择框',
        })}
      </p>
      <p>Upgrading Guide</p>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-button--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-button--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'disable' })}</Subheading>
      <Canvas>
        <Story id="upgraded-button--disable" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'IconButton' })}</Subheading>
      <Canvas>
        <Story id="upgraded-button--icon-button-demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'blockbutton' })}</Subheading>
      <Canvas>
        <Story id="upgraded-button--block-button" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Cascader} />
    </>
  );
}
