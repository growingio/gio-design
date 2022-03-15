import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { FormattedMessage, useIntl } from 'react-intl';
import Text from '../Text';

export default function TextPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Text 文本' })}</Title>
      <Description>{formatMessage({ defaultMessage: '文本的基本格式。' })}</Description>

      <Subtitle>
        <FormattedMessage defaultMessage="使用场景" />
      </Subtitle>
      <Description>
        {formatMessage({
          defaultMessage: '当需要展示标题、段落、列表内容时使用，当段落内容需要省略时。',
        })}
      </Description>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '单行样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-typography-text--single-line" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多行样式' })}</Subheading>
      <Description>{formatMessage({ defaultMessage: '多行文本省略。' })}</Description>
      <Canvas>
        <Story id="upgraded-typography-text--multi-lines" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '英文文本' })}</Subheading>
      <Canvas>
        <Story id="upgraded-typography-text--english" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '文本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-typography-text--styles" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Text} />
    </>
  );
}
