import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import InnerToggle from '../Toggles';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Toggles 开关' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '需要表示开关状态/两种状态之间的切换时使用。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="basic-components-toggles--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '禁用' })}</Subheading>
      <Canvas>
        <Story id="basic-components-toggles--disabled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '文字' })}</Subheading>
      <Canvas>
        <Story id="basic-components-toggles--suffix-content" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义背景色' })}</Subheading>
      <Canvas>
        <Story id="basic-components-toggles--custom-color" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={InnerToggle} />
    </>
  );
}
