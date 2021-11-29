import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Popconfirm from '../Popconfirm';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Popconfirm 气泡确认框' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            '点击元素，弹出气泡式的确认框。目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="legacy-popconfirm--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '受控模式' })}</Subheading>
      <Canvas>
        <Story id="legacy-popconfirm--controlled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '位置' })}</Subheading>
      <Canvas>
        <Story id="legacy-popconfirm--placement" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Popconfirm} />
    </>
  );
}
