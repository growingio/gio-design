import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Checkbox from '../Checkbox';

export default function CheckboxPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Checkbox 多选框' })}</Title>

      <Description>
        {formatMessage({
          defaultMessage: '在一组可选项中进行多项选择。',
        })}
      </Description>

      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4078%3A37260"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '基础的多选框' })}</Subheading>
      <Canvas>
        <Story id="upgraded-checkbox--basic" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '标签' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '使用 `children`，您可以为 `Checkbox` 设置一个标签。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-checkbox--labels" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '颜色' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '使用 `color` 属性，您可以为 `Checkbox` 设置 `checked` 或 `indeterminate` 状态下的背景填充色。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-checkbox--color" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '受控的 Checkbox' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '您可以使用 `checked` 和 `onChange` 属性控制 `Checkbox`。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-checkbox--controlled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多选框组' })}</Subheading>
      <Canvas>
        <Story id="upgraded-checkbox--group" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Checkbox} />
    </>
  );
}
