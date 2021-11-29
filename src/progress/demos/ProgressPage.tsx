import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Progress from '../Progress';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Progress 进度条' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。',
        })}
      </p>

      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A45838">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式：新颜色圆角样式。</li>
        <li>size有两种，default和small</li>
        <li>exception状态percent会替换成中断</li>
        <li>style作用于外层div</li>
      </ul>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-progress--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-progress--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'format=(e)=>e+🌟' })}</Subheading>
      <Canvas>
        <Story id="upgraded-progress--format" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Progress} />
    </>
  );
}
