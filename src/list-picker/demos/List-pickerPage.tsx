import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import ListPicker from '../index';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'ListPicker' })}</Title>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式变化：圆角样式，新popover样式。</li>
        <li>APi变动：children是popover弹出的内容，无冗余api</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-listpicker--default" />
      </Canvas>

      <ArgsTable of={ListPicker} />
    </>
  );
}
