/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { get, isUndefined } from 'lodash';
import RelativeCurrent from './components/RelativeCurrent';
import RelativeBetween from './components/RelativeBetween';
import IncludeToday from './components/IncludeToday';
import DatePicker from '../../../../../../../../date-picker'; // new
import DateRangePicker from '../../../../../../../../date-range-picker'; // new
import { NullableDate } from '../../../../../../../../date-range-picker/interfaces'; // new

interface DateAttrSelectProps {
  attrSelect: string;
  attrChange: (v: string[]) => void;
  values: string[];
  style?: React.CSSProperties;
}
function DateAttrSelect(props: DateAttrSelectProps) {
  const { attrSelect, attrChange, values, style } = props;
  const [time, setTime] = useState<Moment>(
    values?.[0] && parseFloat(values?.[0]).toString() !== 'NaN' ? moment(parseInt(values?.[0], 10)) : moment(Date.now())
  );
  const [timeRange, setTimeRange] = useState<Moment[]>(
    values.length && values?.[0]?.includes?.('abs')
      ? [
          moment(parseInt(values?.[0].split(':')[1].split(',')[0], 10)),
          moment(parseInt(values?.[0].split(':')[1].split(',')[1], 10)),
        ]
      : [moment(Date.now()), moment(Date.now())]
  );

  useEffect(() => {
    setTime(
      values?.[0] && parseFloat(values?.[0]).toString() !== 'NaN'
        ? moment(parseInt(values?.[0], 10))
        : moment(Date.now())
    );
    setTimeRange(
      values.length && values?.[0]?.includes?.('abs')
        ? [
            moment(parseInt(values?.[0].split(':')[1].split(',')[0], 10)),
            moment(parseInt(values?.[0].split(':')[1].split(',')[1], 10)),
          ]
        : [moment(Date.now()), moment(Date.now())]
    );
  }, [values]);

  const checkInitValue = (attr: string, vals: string[]) => {
    if (!vals.length) {
      return true;
    }
    if (vals[0] === ' ' || typeof vals[0] !== 'string') {
      return false;
    }
    const val = vals[0];
    if (attr.includes('relative') && attr !== 'relativeTime') {
      const valsList = val.split(':')[1].split(',');
      if (attr.includes('Current')) {
        return !(valsList.includes('0') || valsList.length === 1);
      }
      return valsList.includes('0');
    }
    return !val.includes('abs');
  };

  useEffect(() => {
    // values值的初始化
    if (attrSelect !== 'relativeTime' && (!values.length || checkInitValue(attrSelect, values))) {
      if (attrSelect.includes('relative')) {
        if (attrSelect.includes('Current')) {
          // 相对现在，values值的初始化
          attrChange(['relativeTime:-1,0']);
        } else {
          // 相对区间，值的初始化
          attrChange(['relativeTime:-1,-1']);
        }
      } else if (attrSelect === 'between' || attrSelect === 'not between') {
        // 在。。。与。。。之间，值的初始化
        attrChange([
          `abs:${moment(timeRange?.[0], 'YYYY-MM-DD').startOf('day').valueOf()},${moment(timeRange?.[1], 'YYYY-MM-DD')
            .endOf('day')
            .valueOf()}`,
        ]);
      } else {
        attrChange([`${moment(Date.now()).valueOf()}`]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attrSelect]);

  const changeDate = (value: Date | null) => {
    const date = moment(value);
    date && setTime(date);
    attrChange([`${moment(date, 'YYYY-MM-DD').startOf('day').valueOf()}`]);
  };
  const relativeDateChange = (v: string) => {
    attrChange([v]);
  };
  const dateRangeChange = (value?: [NullableDate, NullableDate]) => {
    if (!value || isUndefined(get(value, '[0]') || get(value, '[1]'))) return;
    const dateRange = [moment(value?.[0]), moment(value?.[1])];
    dateRange && setTimeRange(dateRange);
    dateRange &&
      attrChange([
        `abs:${moment(dateRange?.[0], 'YYYY-MM-DD').startOf('day').valueOf()},${moment(dateRange?.[1], 'YYYY-MM-DD')
          .endOf('day')
          .valueOf()}`,
      ]);
  };

  switch (attrSelect) {
    case '=':
    case '!=':
      return <DatePicker style={style} value={time.toDate()} onSelect={changeDate} format="yyyy/MM/dd" />;
    case '>':
    case '>=':
    case '<=':
    case '<':
      return <IncludeToday time={time} onChange={changeDate} style={style} />;
    case 'relativeCurrent':
      return <RelativeCurrent onChange={relativeDateChange} attrSelect={attrSelect} values={values} />;
    case 'relativeBetween':
      return <RelativeBetween onChange={relativeDateChange} attrSelect={attrSelect} values={values} />;
    case 'between':
    case 'not between':
      return (
        <DateRangePicker
          value={[timeRange?.[0]?.toDate(), timeRange?.[1]?.toDate()]}
          onSelect={dateRangeChange}
          format="yyyy/MM/dd"
          style={style}
        />
      );
    default:
      return null;
  }
}

export default DateAttrSelect;
