import React from 'react';
import { ArgsTable, Canvas, Description, Heading, Story, Subheading, Subtitle, Title } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Input from '../..';

export default function InputTextAreaPage() {
  return (
    <>
      <Title>Input TextArea 文本域</Title>
      <Description>{`TextArea 基于 [&lt;textarea /&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) 封装。`}</Description>

      <Subtitle>设计稿</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4066%3A42547"
      />

      <Heading>代码演示</Heading>

      <Subheading>基础 Input TextArea</Subheading>
      <Canvas>
        <Story id="upgraded-input-input-textarea--default" />
      </Canvas>

      <Heading>参数说明</Heading>
      <ArgsTable of={Input.TextArea} />
    </>
  );
}
