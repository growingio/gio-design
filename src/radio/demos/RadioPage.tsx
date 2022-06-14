import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Radio from '../Radio';

export default function RadioPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Radio 单选框' })}</Title>

      <Description>
        {formatMessage({
          defaultMessage: '在多个备选项中选中单个选项。',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '使用场景' })}</Subtitle>
      <Description>
        {formatMessage({
          defaultMessage: 'Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=6830%3A91967"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '默认的单选框' })}</Subheading>
      <Canvas>
        <Story id="upgraded-radio--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '禁用样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-radio--disabled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '单选框组' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '一组互斥的 Radio 配合使用。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-radio--group" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '通过options 属性渲染' })}</Subheading>
      <Canvas>
        <Story id="upgraded-radio--options" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Radio} />
    </>
  );
}
