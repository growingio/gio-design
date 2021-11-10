import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Popover from '../Popover';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Popover 气泡确认框' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            '  点击元素，弹出气泡式的确认框。目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="legacy-popover--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'click 触发' })}</Subheading>
      <Canvas>
        <Story id="legacy-popover--click-popover" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '箭头指向' })}</Subheading>
      <Canvas>
        <Story id="legacy-popover--arrow" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '位置用' })}</Subheading>
      <Canvas>
        <Story id="legacy-popover--placement" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Popover} />
    </>
  );
}
