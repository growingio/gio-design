import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import moment, { Moment } from 'moment';
import { withDesign } from 'storybook-addon-designs';
import DatePicker, { DateRangePicker, DatePickerProps, DateRangePickerProps } from '.';
import './style';
import Docs from './DatePicker.mdx';

export default {
  title: 'Functional Components/DatePicker',
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
  const [time, setTime] = useState(moment(new Date()));
  const onChange = (value: Moment | null) => {
    value && setTime(value);
  };
  const disabledDate = (value: Moment) => {
    const date = moment(new Date()).add(-1, 'days');
    return value.isBefore(date);
  };
  return (
    <div style={{ marginLeft: '200px', marginTop: '100px' }}>
      <DatePicker
        {...args}
        value={time}
        onChange={onChange}
        disabledDate={args.disabledDate ? args.disabledDate : disabledDate}
      />
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {
  format: 'YYYY-MM-DD',
  showFooter: true,
};

function disabledDates(current: Moment) {
  return current && current < moment().endOf('day');
}

const RangeTemplate: Story<DateRangePickerProps> = (args) => {
  const now = new Date();
  const [time, setTime] = useState([moment(now), moment(now)]);
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
