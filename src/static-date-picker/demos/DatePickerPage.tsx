import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import DatePicker from '../DatePicker';

export default function DatePickerPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'DatePicker 日期选择器' })}</Title>
      <p>{formatMessage({ defaultMessage: '当用户需要一个日期，可以在面板中进行选择。' })}</p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="legacy-staticdatepicker--basic" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '禁止选择部分日期' })}</Subheading>
      <p className="">{formatMessage({ defaultMessage: '可用 disabledDate 禁止选择部分日期。' })}</p>
      <Canvas>
        <Story id="legacy-staticdatepicker--disabled-date" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '面板日期' })}</Subheading>
      <p>{formatMessage({ defaultMessage: '设置面板显示的日期。' })}</p>
      <Canvas>
        <Story id="legacy-staticdatepicker--view-date" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={DatePicker} />
    </>
  );
}
