import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import moment, { Moment } from 'moment';
import DatePicker, { DateRangePicker, DatePickerProps, DateRangePickerProps } from './index'
import './style'

export default {
    title: 'Components/Functional/DatePicker',
    component: DatePicker,
    subcomponents: { DateRangePicker },
} as Meta;

const DatePickerDemo = (args : DatePickerProps) => {
    const [time, setTime] = useState(moment(new Date()));
    const onChange = (value: Moment | null) => {
      value && setTime(value);
    };
    const disabledDate = (value: Moment) => {
      const date = moment(new Date()).add(-1, 'days')
      return value.isBefore(date);
    };
    const format = 'YYYY/MM/DD';
    return (
      <div style={{marginLeft:"200px",marginTop:"100px"}}>
        <DatePicker
          {...args}
          value={args.value ? args.value : time}
          onChange={args.onChange ? args.onChange : onChange}
          format={args.format ? args.format : format}
          showFooter={args.showFooter ? args.showFooter : true}
          disabledDate={args.disabledDate ? args.disabledDate : disabledDate}
        />
      </div>
    );
  };

const Template : Story<DatePickerProps> = (args) => <>{DatePickerDemo(args)}</>;
export const Default = Template.bind({});
Default.args = {
    format: 'YYYY-MM-DD',
}


function disabledDates(current:Moment) {
    return current && current < moment().endOf('day');
}
const RangePickerDemo = (args : DateRangePickerProps) => {
    const [time, setTime] = useState([moment(new Date()), moment(new Date())]);
    const format = 'YYYY/MM/DD';
    const onChange = (value: Array<Moment> | null) => {
      value && setTime(value);
    };
    const renderExtraFooter = () => {
      return <div>extra footer</div>
    }
    return (
      <div style={{marginLeft:"200px",marginTop:"100px"}}>
        <DateRangePicker 
          renderExtraFooter={args.renderExtraFooter ? args.renderExtraFooter : renderExtraFooter} 
          value={args.value ? args.value : time}
          onChange={args.onChange ? args.onChange : onChange}
          format={args.format ? args.format : format}
          showFooter={args.showFooter ? args.showFooter : true}
          disabledDate={args.disabledDate ? args.disabledDate : disabledDates}
        />
      </div>
    );
};

const RangeTemplate : Story<DateRangePickerProps> = (args) => <>{RangePickerDemo(args)}</>;
export const DateRangePickers = RangeTemplate.bind({});
DateRangePickers.args = {
    format: 'YYYY-MM-DD',
}