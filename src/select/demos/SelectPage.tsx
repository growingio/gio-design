import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Select from '../index';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Select' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            '下拉选择器，让用户做出选择。Select 与 Dropdown 的区别是 Select 承载的是选项，Dropdown 的承载的是操作。',
        })}
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式：两种大小，新边框样式</li>
        <li>Api：删除冗余api</li>
        <li>包装的input，type=text，</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-select--demo" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-select--default" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Select} />
    </>
  );
}
