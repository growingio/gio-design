import React from 'react';
import { ArgsTable, Canvas, Description, Heading, Story, Subheading, Subtitle, Title } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Input from '../..';

export default function InputNumberPage() {
  return (
    <>
      <Title>Input Number 数字输入框</Title>
      <Description>{`Input Number 封装自 Input，并且基于 [&lt;input type="number" /&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/number) 所以您可以使用所有 Input 的 API`}</Description>

      <Subtitle>设计稿</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4066%3A42547"
      />

      <Heading>代码演示</Heading>

      <Subheading>基础 Input Number</Subheading>
      <Canvas>
        <Story id="upgraded-input-input-inputnumber--default" />
      </Canvas>

      <Subheading>图标</Subheading>
      <Canvas>
        <Story id="upgraded-input-input-inputnumber--icons" />
      </Canvas>

      <Heading>参数说明</Heading>
      <ArgsTable of={Input.InputNumber} />
    </>
  );
}
