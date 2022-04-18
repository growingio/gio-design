import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Subtitle, Description } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import CollapsePanel from '../CollapsePanel';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Collapse Panel' })}</Title>
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
        <Story id="upgraded-collapse-panel--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '折叠箭头展示/隐藏' })}</Subheading>
      <Canvas>
        <Story id="upgraded-collapse-panel--showarrow" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'Icon替换' })}</Subheading>
      <Canvas>
        <Story id="upgraded-collapse-panel--extra" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={CollapsePanel} />
    </>
  );
}
