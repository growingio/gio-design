import React from 'react';
import { ArgsTable, Story, Canvas, Heading, Title, Subheading } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import TimePicker from '../TimePicker';

export default function Timepicker() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'TimePicker 时间选择框' })}</Title>

      <p>{formatMessage({ defaultMessage: '当用户需要一个时间，可以点击选择框，弹出日期面板进行选择。' })}</p>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式变化：新滚动条样式</li>
        <li>api变化：同过去的timepicker</li>
        <li>新增staticTimePicker</li>
      </ul>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-timepicker--basic" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '显示秒' })}</Subheading>
      <Canvas>
        <Story id="upgraded-timepicker--show-second" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'TimePicker.Static基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-timepicker--static-basic" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'TimePicker.Static显示秒' })}</Subheading>
      <Canvas>
        <Story id="upgraded-timepicker--static-show-second" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={TimePicker} />
    </>
  );
}
