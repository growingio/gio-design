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

      <Subheading>{formatMessage({ defaultMessage: '通过按钮控制' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '配合内容及按钮使用，表示一个流程的处理进度，用于分步表单填写',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-steps--controlled-current" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '自定义图标步骤条' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '通过设置`Step.prefix` 属性，可以启用自定义图标',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-steps--icon-step" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '受控current' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`current`为当前Step的index(从1开始)，，',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-steps--on-change" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '大小' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`size`有两种，normal高度为36px，small高度为30px',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-steps--small-size" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '步骤条超出外框范围' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '当内容显示不全时 Item 宽度增加，Steps 在容器内横向滚动不换行',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-steps--scrollable" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Steps} />
    </>
  );
}
