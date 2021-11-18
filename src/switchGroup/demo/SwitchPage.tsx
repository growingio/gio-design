import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Switch from '../SwitchItem';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Switch 切换' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: 'Switch 切换的交互行为类似 Radio Button Group，用于在多个备选项中选中单个选项。',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=6322%3A62046">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>switch Item 无意义</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-switch--demo" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'icon group' })}</Subheading>
      <Canvas>
        <Story id="upgraded-switch--icon-group" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-switch--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'disabled' })}</Subheading>
      <Canvas>
        <Story id="upgraded-switch--disabled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'JSX' })}</Subheading>
      <Canvas>
        <Story id="upgraded-switch--jsx" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Switch} />
    </>
  );
}
