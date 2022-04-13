import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Subtitle, Description } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import { useIntl } from 'react-intl';
import PastTimePicker from '..';

export default function DatePickerPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Past Time Picker 时间条件控件' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '用户可以通过日期区间选择器选择想要选择的相对和绝对的日期区间。',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4294%3A40310"
      />
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Description>
        {formatMessage({
          defaultMessage: ' `PastTimePicker` 是包含 常用时间、自某天以后、过去动态时段、过去固定时段为一体的时间选择控件。',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage: ' `<PastTimePicker />` 是带触发器的时间条件控件面板，`<PastTimePicker.Static /> `是静态时间条件控件面板。',
        })}
      </Description>
      <Subheading>{formatMessage({ defaultMessage: '默认状态' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '左侧列表包含4种选择方式`常用时间、从某日至今、动态时段、过去固定时段`，无其他条件限制',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-pasttimepicker--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '常用时间' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '常用时间包含用户常用的时间段快速选择，可以通过`quickOptionsFilter`参数过滤需要的时间段',
        })}
      </Description>
     <Canvas>
        <Story id="upgraded-pasttimepicker--quick" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '从某日至今' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '当用户选择“从某日至今”时，用户可以借助时间选择器选择从某一特定日期至今日的动态区间（今日日期为动态）。由于只有开始日期需要选择，我们让用户通过更改日历来做选出开始日期。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-pasttimepicker--since" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '动态时段' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '当用户选择“过去 N 天”时，用户可以借助时间选择器选择过去 N 天或者过去 N~M天，这样他可以查看（相对今天）过去一段时间范围的数据。我们让用户用过输入数字或更改日历来做出 N 天的选择',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-pasttimepicker--relative" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '过去固定时段' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '当用户选择“过去固定时段”时，用户可以借助时间选择器选择日期区间的开始日期和结束日期，该日期区间为固定日期区间。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-pasttimepicker--absolute" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '常用时间-区分至昨日至今日' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '当用户选择“常用时间”，用户在选择`本周、本月、本季度、今年`时。面板下将区分至昨日或至今日，只需开启`experiment`参数，不开启默认为至今日',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-pasttimepicker--experiment" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '自定义模式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '“常用时间”必须显示，另外三种模式可配置，`modes` 属性，默认`since,relative,absolute`。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-pasttimepicker--modes" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '选择器禁用' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可用`disabled`属性控制选择器禁用',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-pasttimepicker--disabled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '禁用日期' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可用`disabledDate`属性控制时间段不可选',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-pasttimepicker--disabled-date" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'PastTimePicker 无触发器模式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可用`<PastTimePicker.Static />`属性选用无触发器模式',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-pasttimepicker--static-default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '区分至昨日至今日' })}</Subheading>
      <Canvas>
        <Story id="upgraded-pasttimepicker--static-experiment" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '自定义模式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-pasttimepicker--static-modes" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '禁用日期' })}</Subheading>
      <Canvas>
        <Story id="upgraded-pasttimepicker--disabled-date" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={PastTimePicker} />
    </>
  );
}
