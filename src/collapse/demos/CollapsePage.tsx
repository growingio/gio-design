import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Subtitle, Description } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Collapse from '../Collapse';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Collapse 折叠面板' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '折叠面板用于整理页面中的信息，便于用户可以选择看到整体还是局部。',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>

      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=6803%3A76072"
      />
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基础使用' })}</Subheading>
      <Canvas>
        <Story id="upgraded-collapse--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '额外节点' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '右侧附加额外的节点，可用于额外附加操作',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-collapse--extra" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '手风琴效果' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '每次只打开一个 tab',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-collapse--accordion" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '无边框' })}</Subheading>
      <Canvas>
        <Story id="upgraded-collapse--bordered" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '嵌套面板' })}</Subheading>
      <Canvas>
        <Story id="upgraded-collapse--secondmenu" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Collapse} />
    </>
  );
}
