import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Steps from '../Steps';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Steps 步骤条' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '分步完成复杂的表单操作流程 用于切换下方的内容',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=6341%3A62729">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>包装自tabs，样式调整，</li>
        <li>Steps 组件基于 Tabs 组件（size = normal)，增加是否完成的判断，完成的步骤有 icon、未完成步骤没有。</li>
        <li>Steps 组件在使用时，通常只有当前步骤完成后，下一步骤才会解除 disabled 状态。</li>
        <li>current 指定当前步骤，从 1 开始记数。</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-steps--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-steps--default" />
      </Canvas>
      {/* <Subheading>{formatMessage({ defaultMessage: 'no-tab' })}</Subheading>
       <Canvas>
        <Story id="upgraded-steps--no-tab" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'no-prefix' })}</Subheading>
      <Canvas>
        <Story id="upgraded-steps--no-prefix" />
      </Canvas>  */}
      <Subheading>{formatMessage({ defaultMessage: 'have-children' })}</Subheading>
      <Canvas>
        <Story id="upgraded-steps--have-children" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Steps} />
    </>
  );
}
