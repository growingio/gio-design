import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Tooltip from '../Tooltip';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Tooltip 文字提示' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '简单的文字提示气泡框。鼠标悬停时显示提示，移出即消失，气泡浮层不承载复杂文本和操作。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="legacy-tooltip--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '链接' })}</Subheading>
      <Canvas>
        <Story id="legacy-tooltip--link" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多行' })}</Subheading>
      <Canvas>
        <Story id="legacy-tooltip--multi-line" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Tooltip} />
    </>
  );
}
