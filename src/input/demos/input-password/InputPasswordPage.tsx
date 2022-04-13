import React from 'react';
import { ArgsTable, Canvas, Description, Heading, Story, Subheading, Subtitle, Title } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Input from '../..';

export default function InputPasswordPage() {
  return (
    <>
      <Title>Input Password 密码输入框</Title>
      <Description>{`Password 封装自 Input，并且基于 [&lt;input type="password" /&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/password) 所以您可以使用所有 Input 的 API`}</Description>

      <Subtitle>设计稿</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4066%3A42547"
      />

      <Heading>代码演示</Heading>

      <Subheading>基础 Input Password</Subheading>
      <Canvas>
        <Story id="upgraded-input-input-password--default" />
      </Canvas>

      <Heading>参数说明</Heading>
      <ArgsTable of={Input.Password} />
    </>
  );
}
