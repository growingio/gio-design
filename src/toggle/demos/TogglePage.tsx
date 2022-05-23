import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import { useIntl } from 'react-intl';
import Toggle from '../Toggle';

export default function TogglePage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Toggle 开关' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage:
            '需要表示开关状态/两种状态之间的切换时使用,有文案时文案应显示当前状态。和 checkbox 的区别是，切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合。',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4078%3A37806"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-toggle--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '开关控制文本' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`checkedChildren`参数是选中时的后缀节点，`unCheckedChildren`是未选中时的后缀节点。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-toggle--checked-children-and-un-checked-children" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '内容' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '`children`参数在没有`checkedChildren`和`unCheckedChildren`参数时生效，在toggle后显示，不受开关状态控制',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-toggle--children" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '默认开启' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`defaultOn`参数为true时，开关默认开启',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-toggle--default-on" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '禁用' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`disabled`参数为true时，toggle禁用',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-toggle--disabled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '开启状态' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`on`参数为true时，表示开启状态',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-toggle--on" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '触发事件' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`onChange`参数在每次状态改变后触发，原生自input的onChange，可观看控制台console',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-toggle--on-change" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Toggle} />
    </>
  );
}
