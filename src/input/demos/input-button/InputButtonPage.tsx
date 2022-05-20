import React from 'react';
import { ArgsTable, Canvas, Description, Heading, Story, Subheading, Subtitle, Title } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Input from '../..';

export default function InputButtonPage() {
  return (
    <>
      <Title>Input Button 输入按钮</Title>
      <Description>通常作为选择器的触发以及选中内容的回显。</Description>
      <Description>
        `Input.Button` 跟 `Button` 的主要区别是，Input.Button 一般只作为下拉选择的触发器，比如
        ListPicker、Cascader、DatePicker 等组件的触发器。
      </Description>
      <Description>Input Button 组件底层使用了 Input 组件，将 input 的 type 属性设置为了 button。</Description>

      <Subtitle>设计稿</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=6773%3A66205"
      />

      <Heading>代码演示</Heading>

      <Subheading>基础 Input Button</Subheading>
      <Canvas>
        <Story id="upgraded-input-input-button--default" />
      </Canvas>

      <Subheading>禁用按钮</Subheading>
      <Description>您可以设置 `disabled` 以禁用按钮。</Description>
      <Canvas>
        <Story id="upgraded-input-input-button--disabled" />
      </Canvas>

      <Subheading>清空内容</Subheading>
      <Description>
        您可以设置 `allowClear` 属性，在 `value` 不为空的时候，会在按钮右侧显示清除按钮，您可以通过 `onClear`
        事件来监听此行为。
      </Description>
      <Canvas>
        <Story id="upgraded-input-input-button--clearable" />
      </Canvas>

      <Subheading>自定义图标</Subheading>
      <Description>您可以通过 `prefix` 和 `suffix` 两个属性来设置前后的图标。</Description>
      <Canvas>
        <Story id="upgraded-input-input-button--icons" />
      </Canvas>

      <Subheading>不同尺寸</Subheading>
      <Description>Input Button 有两种不同的尺寸。</Description>
      <Canvas>
        <Story id="upgraded-input-input-button--size" />
      </Canvas>

      <Subheading>Active</Subheading>
      <Description>您可以通过 `active` 属性来设置当前状态。</Description>
      <Canvas>
        <Story id="upgraded-input-input-button--active" />
      </Canvas>

      <Subheading>Loading</Subheading>
      <Description>
        Input Button 支持 loading 属性。如果 loading 为 true，则其 suffix icon 将显示一个 Loading
        Icon，并且为不可点击状态
      </Description>
      <Canvas>
        <Story id="upgraded-input-input-button--loading" />
      </Canvas>

      <Heading>参数说明</Heading>
      <ArgsTable of={Input.Button} />
    </>
  );
}
