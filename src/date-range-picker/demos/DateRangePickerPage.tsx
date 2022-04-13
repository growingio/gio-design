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
      <Subheading>{formatMessage({ defaultMessage: '允许清除' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`allowClear` 参数开启将允许清楚value',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-daterangepicker--allow-clear" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '自定义触发器' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以传入Node节点在 `trigger` 属性上，来实现自定义触发器',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-daterangepicker--custom-trigger" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '选择器禁用' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '通过`disabled`，让时间选择器失效',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-daterangepicker--disabled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '自定义格式化日期' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`format` 属性传入日期指定格式化，详情可参考 https://date-fns.org/v2.28.0/docs/format',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-daterangepicker--format" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '事件触发方式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`onSelect`选中日期后触发，`onClose` 在allowClear为true时，清空选择框触发， `onChange` 在影响inputButton的Value后触发，详情可看Actions执行顺序',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-daterangepicker--on-select-and-on-close" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '前缀与后缀' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`prefix`前缀，`suffix`后缀，传入将代替前后缀icon ',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-daterangepicker--prefix-and-suffix" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '大小切换' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`size`属性设置inputButton大小，`small` 30px `normal` 36px',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-daterangepicker--size" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '无触发器面板' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '去掉触发器的静态面板',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-daterangepicker--static-basic" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '禁选时间段' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以通过 `disabledDate`参数，屏蔽特定时间段',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-daterangepicker--static-disabled-date" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '默认可见日期' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以通过 `defaultViewDates`参数，设置默认可见日历中的日期',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-daterangepicker--static-view-dates" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={DataRangePicker} />
    </>
  );
}
