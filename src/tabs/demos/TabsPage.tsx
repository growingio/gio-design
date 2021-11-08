import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Tabs from '../Tabs';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Tabs 标签页' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '标签栏使您能够通过单个对象结构关联多个导航端点，tab 用于切换下方的内容',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4092%3A41170">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>子元素为tab</li>
        <li>不再区分tabnav，tabs</li>
        <li>block参数取消</li>
        <li>去掉了过渡动画</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tabs--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tabs--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'no-tab' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tabs--no-tab" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'no-prefix' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tabs--no-prefix" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'have-children' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tabs--have-children" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Tabs} />
    </>
  );
}
