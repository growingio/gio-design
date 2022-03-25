import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import title from '../title';

export default function TextPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Title 标题' })}</Title>
      <Description>{formatMessage({ defaultMessage: '标题的基本格式。' })}</Description>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: 'Title 标题' })}</Subheading>
      <Canvas>
        <Story id="upgraded-typography-title--default" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={title} />
    </>
  );
}
