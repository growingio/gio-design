import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Subtitle, Description } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Switch from '..';

export default function SwitchPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Switch 切换' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: 'Switch 切换的交互行为类似 Radio Button Group，用于在多个备选项中选中单个选项。',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=6322%3A62046"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: 'Switch 支持两种传值方式，通过`options`属性传入数组，或通过jsx形式传入`<Switch.Item />`',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-switch--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Option参数' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: 'Switch也可以通过`options`属性传入数组',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-switch--options" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '整体禁用' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: 'switch 外层的 `disabled`属性`，让整个switch禁用',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-switch--disabled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '大小' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`size`属性控制控制大小',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-switch--size" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '默认值' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`defaultValue`属性控制选中的默认值，与item的value匹配',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-switch--default-value" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '触发事件' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`onChange`属性在切换item时触发，是底层input事件，可在控制台console查看',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-switch--default-value" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'switch受控模式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`value`属性在switch上，传入value时为受控模式(非undefined)',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-switch--switch-value" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '不使用options属性，传入Item写法(JSX)写法' })}</Subheading>
      <Canvas>
        <Story id="upgraded-switch--switch-item" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'item自控制默认选中' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`defaultChecked`属性在item上控制，为true时默认选中',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-switch--item-default-checked" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'item前缀' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`disabled`属性在item上控制时，当前item不可选',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-switch--item-disabled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'item选中' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`checked`属性在item上控制时，当前item为选中状态',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-switch--item-checked" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Switch} />
    </>
  );
}
