import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import InputButton from '../InputButton';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Input Button 输入按钮' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            'In Button 继承 Secondary Button 的样式（但有背景色），通常作为选择器的触发以及选中内容的回显，支持回显Icon',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=6307%3A70262">
          Figma
        </a>
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-inputbutton--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-inputbutton--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '隐藏前缀' })}</Subheading>
      <Canvas>
        <Story id="upgraded-inputbutton--hide-prefix" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '自定义前后缀icon' })}</Subheading>
      <Canvas>
        <Story id="upgraded-inputbutton--custom-icon" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={InputButton} />
    </>
  );
}
