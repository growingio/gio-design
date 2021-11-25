import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import DatePicker from '..';

export default function DatePickerPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'DateRangePicker 日期范围选择器' })}</Title>
      <p>{formatMessage({ defaultMessage: '当用户需要一个日期区间，可以在面板中进行选择。' })}</p>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式变化：无变动</li>
        <li>APi变化：无变动</li>
        <li>老版的datepicker拆出来的DateRangePicker</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-daterangepicker--basic" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '禁止选择部分日期' })}</Subheading>
      <p className="">{formatMessage({ defaultMessage: '可用 disabledDate 禁止选择部分日期。' })}</p>
      <Canvas>
        <Story id="upgraded-daterangepicker--disbaled-date" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'DateRangePicker.Static基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-daterangepicker--static-basic" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'DateRangePicker.Static禁止选择部分日期' })}</Subheading>
      <p className="">{formatMessage({ defaultMessage: '可用 disabledDate 禁止选择部分日期。' })}</p>
      <Canvas>
        <Story id="upgraded-daterangepicker--static-disabled-date" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'DateRangePicker.Static面板日期' })}</Subheading>
      <p>{formatMessage({ defaultMessage: '设置面板显示的日期。' })}</p>
      <Canvas>
        <Story id="upgraded-daterangepicker--static-default-view-dates" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={DatePicker} />
    </>
  );
}
