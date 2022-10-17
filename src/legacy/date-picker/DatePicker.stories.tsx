import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Moment } from 'moment';
import { withDesign } from 'storybook-addon-designs';
import { parseTimeZone } from '../../utils/timeHelper';
import DatePicker, { DateRangePicker, DatePickerProps, DateRangePickerProps } from '.';
import './style';
import Docs from './DatePicker.mdx';

export default {
  title: 'legacy/DatePicker',
  component: DatePicker,
  subcomponents: { DateRangePicker },
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=889%3A2381',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<DatePickerProps> = (args) => {
  const [time, setTime] = useState(parseTimeZone(new Date()));
  const onChange = (value: Moment | null) => {
    value && setTime(value);
  };
  const { disabledDate } = args;
  const handleDisabledDate = (value: Moment) => {
    const date = parseTimeZone(new Date()).add(-1, 'days');
    return value.isBefore(date);
  };
  return (
    <div style={{ marginLeft: '200px', marginTop: '100px' }}>
      <DatePicker {...args} value={time} onChange={onChange} disabledDate={disabledDate || handleDisabledDate} />
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {
  format: 'YYYY-MM-DD',
  showFooter: true,
};

function disabledDates(current: Moment) {
  return current && current < parseTimeZone().endOf('day');
}

const RangeTemplate: Story<DateRangePickerProps> = (args) => {
  const now = new Date();
  const [time, setTime] = useState([parseTimeZone(now), parseTimeZone(now)]);
  const onChange = (value: Array<Moment> | null) => {
    value && setTime(value);
  };
  const renderExtraFooter = () => <div>extra footer</div>;
  return (
    <div style={{ marginLeft: '200px', marginTop: '100px' }}>
      <DateRangePicker
        {...args}
        renderExtraFooter={renderExtraFooter}
        value={time}
        onChange={onChange}
        disabledDate={disabledDates}
      />
    </div>
  );
};
export const DateRangePickers = RangeTemplate.bind({});
DateRangePickers.args = {
  format: 'YYYY-MM-DD',
  showFooter: true,
};
