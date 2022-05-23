import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import { useIntl } from 'react-intl';
import Steps from '../Steps';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Steps 步骤条' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '分步完成复杂的表单操作流程 用于切换下方的内容',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=6341%3A62729"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-steps--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '有内容时' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以在Steps.step中添加子元素作为内容切换',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-steps--have-children" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '有点击按钮交互写法' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以结合实际情况添加button完成步骤交互',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-steps--have-step-button" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '点击事件' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`onChange`为点击事件，可查看console控制台查看',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-steps--on-change" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '受控模式value' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`value`为受控模式的值，`current`为当前步骤，可以在current不改变情况下，切换当前key',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-steps--value" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '大小' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`size`有两种，normal高度为36px，small高度为30px',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-steps--size" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Steps} />
    </>
  );
}
