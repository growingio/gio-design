import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Popconfirm from '../index';

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
      <p>Upgrading Guide</p>
      <ul>
        <li>样式：无变化。</li>
        <li>api变化：无，实现方式用的popover，就是带样式和确定取消的popover。</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: 'controlled' })}</Subheading>
      <Canvas>
        <Story id="upgraded-popconfirm--controlled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'description' })}</Subheading>
      <Canvas>
        <Story id="upgraded-popconfirm--description" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'disabled' })}</Subheading>

      <Canvas>
        <Story id="upgraded-popconfirm--disabled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'placement' })}</Subheading>
      <Canvas>
        <Story id="upgraded-popconfirm--placement" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'trigger' })}</Subheading>
      <Canvas>
        <Story id="upgraded-popconfirm--trigger" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Popconfirm} />
    </>
  );
}
