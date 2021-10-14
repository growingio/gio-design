import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Skeleton from '../Skeleton';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Skeleton 骨架屏' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '在需要等待加载内容的位置提供一个占位图形组合。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '骨架图' })}</Subheading>
      <Canvas>
        <Story id="feedback-skeleton--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '占位图' })}</Subheading>
      <Canvas>
        <Story id="feedback-skeleton--image" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Skeleton} />
    </>
  );
}
