import React from 'react';
import { ArgsTable, Canvas, Description, Heading, Story, Subheading, Subtitle, Title } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Input from '../../Input';

export default function InputPage() {
  return (
    <>
      <Title>Input 输入框</Title>
      <Description>通过鼠标或键盘输入内容，是最基础的表单域的包装。</Description>
      <Description>
        Input 组件支持[所有原生属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input)
      </Description>
      <Description>
        Input 组件仅提供了最简单的输入功能以及其他样式，如您需使用 label、输入验证或帮助信息等功能，请跟 [Form
        组件](?path=/story/upgraded-form--default) 搭配使用。
      </Description>

      <Subtitle>设计稿</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4066%3A42547"
      />

      <Heading>代码演示</Heading>

      <Subheading>基础 Input</Subheading>
      <Canvas>
        <Story id="upgraded-input-input--default" />
      </Canvas>

      <Subheading>Icons 图标</Subheading>
      <Description>Input 提供了在文本框内展示图标的不同方式。</Description>
      <Canvas>
        <Story id="upgraded-input-input--icons-input" />
      </Canvas>

      <Subheading>使用 Input Ref</Subheading>
      <Description>支持传入 Ref，您可以使用 Ref 来控制 Input。</Description>
      <Canvas>
        <Story id="upgraded-input-input--input-ref" />
      </Canvas>

      <Subheading>Input 尺寸</Subheading>
      <Description>Input 提供了两种不同的尺寸。</Description>
      <Canvas>
        <Story id="upgraded-input-input--input-size" />
      </Canvas>

      <Subheading>监听键盘回车事件</Subheading>
      <Description>{`您可以传入 \`onPressEnter\` 事件，此事件会在按下 <kbd>Enter</kbd> 键之后触发。您也可以传入 \`onKeyPress\` 事件监听其他键盘事件。`}</Description>
      <Canvas>
        <Story id="upgraded-input-input--enter-event" />
      </Canvas>

      <Heading>参数说明</Heading>
      <ArgsTable of={Input} />
    </>
  );
}
