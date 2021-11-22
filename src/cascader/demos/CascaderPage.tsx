import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Cascader from '../index';

export default function CardPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Cascader 级联选择器' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '递进式选择器',
        })}
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>null</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例' })}</Subheading>

      <Canvas>
        <Story id="upgraded-cascader--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '简单结构' })}</Subheading>

      <Canvas>
        <Story id="upgraded-cascader--default" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Cascader} />
    </>
  );
}
