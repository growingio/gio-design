import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Toggle from '../Toggle';

export default function TogglePage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Toggle 开关' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            '需要表示开关状态/需要表示开关状态/两种状态之间的切换时使用,有文案时文案应显示当前状态。 和 checkbox 的区别是，切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合。',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4078%3A37806">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式：新颜色样式</li>
        <li>去除冗余api</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-toggle--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-toggle--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '禁用' })}</Subheading>
      <Canvas>
        <Story id="upgraded-toggle--disabled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '后缀' })}</Subheading>
      <Canvas>
        <Story id="upgraded-toggle--suffix" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Toggle} />
    </>
  );
}
