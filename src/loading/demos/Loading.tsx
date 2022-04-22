import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Subtitle, Description } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Loading from '../Loading';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Loading 加载' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: 'loading图，用于加载过程的loading状态。',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>

      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4093%3A45840"
      />
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基础使用' })}</Subheading>
      <Canvas>
        <Story id="upgraded-loading--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Container' })}</Subheading>
      <Canvas>
        <Story id="upgraded-loading--container" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'Indicator' })}</Subheading>
      <Canvas>
        <Story id="upgraded-loading--indicator" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'Delay' })}</Subheading>
      <Canvas>
        <Story id="upgraded-loading--delay" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'Size' })}</Subheading>
      <Canvas>
        <Story id="upgraded-loading--size" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Loading} />
    </>
  );
}
