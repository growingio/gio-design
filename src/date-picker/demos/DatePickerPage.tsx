import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import DataPicker from '../Picker';

export default function DataPickerPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Date Picker 日期选择器' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '当用户需要一个日期，可以在面板中进行选择。',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=6945%3A85923"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Description>
        {formatMessage({
          defaultMessage: ' `<DataPicker />` 是带触发器的日期选择器面板，`<DataPicker.Static /> `是日期选择器面板',
        })}
      </Description>
      <Subheading>{formatMessage({ defaultMessage: '默认情况' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '选择具体某一天',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-datepicker--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义触发器' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以传入Node节点在 `trigger` 属性上，来实现自定义触发器',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-datepicker--custom-trigger" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '选择器禁用' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '通过`disabled`属性，让时间选择器失效',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-datepicker--disabled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '日期选择器的静态面板' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '去掉触发器的静态面板',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-datepicker--static-basic" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '不可选时间段' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以通过 `disabledDate`参数，屏蔽特定时间段',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-datepicker--static-disabled-date" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '默认可见日期' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以通过 `viewDate`参数，设置默认可见日历中的日期',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-datepicker--static-view-date" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={DataPicker} />
    </>
  );
}
