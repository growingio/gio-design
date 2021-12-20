import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Collapse from '../Collapse';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Collapse 折叠面板' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '折叠面板用于整理页面中的信息，便于用户可以选择看到整体还是局部。',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=7034%3A72443">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>
          <a href="https://www.npmjs.com/package/rc-collapse">rc-collapse</a>
        </li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-collapse--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Collapse} />
    </>
  );
}
