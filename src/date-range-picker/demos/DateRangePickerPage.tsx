import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import DataRangePicker from '../Picker';

export default function DataRangePickerPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'DataRangePicker 日期区间选择器' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '当用户需要一个日期区间，可以在面板中进行选择。',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4078%3A37849"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Description>
        {formatMessage({
          defaultMessage: ' `<DataRangePicker />` 是带触发器的时间选择器面板，`<DataRangePicker.Static /> `是时间选择器面板',
        })}
      </Description>
      <Subheading>{formatMessage({ defaultMessage: '默认情况' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '不传参数的默认情况，用面板选择固定时间区间',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-daterangepicker--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义触发器' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以传入Node节点在 `trigger` 属性上，来实现自定义触发器',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-daterangepicker--trigger" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'disabled' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '通过`disabled`属性，让选择器失效',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-daterangepicker--disabled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'DataRangePicker.Static' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '去掉触发器的静态面板',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-daterangepicker--static-basic" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'disabledDate' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以通过 `disabledDate`参数，屏蔽特定时间段',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-daterangepicker--static-disabled-date" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={DataRangePicker} />
    </>
  );
}
