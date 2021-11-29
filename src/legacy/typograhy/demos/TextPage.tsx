import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Text from '../Text';

export default function TextPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Text 文本' })}</Title>
      <p>{formatMessage({ defaultMessage: '文本的基本格式。' })}</p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '单行样式' })}</Subheading>
      <Canvas>
        <Story id="legacy-text--single-line" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多行样式' })}</Subheading>
      <p className="">{formatMessage({ defaultMessage: '通过文案行数省略，并用 Tooltip 显示全文。' })}</p>
      <Canvas>
        <Story id="legacy-text--multi-lines" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '英文文本' })}</Subheading>
      <Canvas>
        <Story id="legacy-text--english" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '文本样式' })}</Subheading>
      <Canvas>
        <Story id="legacy-text--styles" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Text} />
    </>
  );
}
