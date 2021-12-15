import { get } from 'lodash';
import { TimeMode } from '../interfaces';
import { parseFixedMode, parseTimeMode } from '../utils';

describe('StaticPastTimePicker utils', () => {
  it('can parse fixed mode', () => {
    const timeRangeFixModeMapping = {
      'since:1234567890123': 'today',
      'since:1234567890123,1': 'yesterday',
      'day:9,1': 'yesterday',
      'day:9,0': false,
      'abs:1234567890123,1234567890123': false,
      xxx: false,
    };
    Object.keys(timeRangeFixModeMapping).forEach((timeRange) => {
      expect(parseFixedMode(timeRange)).toBe(get(timeRangeFixModeMapping, timeRange));
    });
  });

  // it('can parse start and end date', () => {
  //   expect(parseStartAndEndDate('')).toEqual([undefined, undefined]);
  //   expect(parseStartAndEndDate('hour')).toEqual([undefined, undefined]);
  //   expect(parseStartAndEndDate('hour:2,1')).toEqual([undefined, undefined]);

  //   const today = startOfToday();
  //   const yesterday = startOfYesterday();

  //   const sinceTimeRange = `since:${today.valueOf()}`;
  //   const sinceTimeRangeToYesterday = `since:${today.valueOf()},1`;
  //   let [start, end] = parseStartAndEndDate(sinceTimeRange);
  //   expect([start.valueOf(), end.valueOf()]).toEqual([today.valueOf(), today.valueOf()]);
  //   [start, end] = parseStartAndEndDate(sinceTimeRangeToYesterday);
  //   expect([start.valueOf(), end.valueOf()]).toEqual([today.valueOf(), yesterday.valueOf()]);

  //   const dynamicTimeRange = 'day:1,0';
  //   [start, end] = parseStartAndEndDate(dynamicTimeRange);
  //   expect([start.valueOf(), end.valueOf()]).toEqual([yesterday.valueOf(), today.valueOf()]);

  //   const absoluteTimeRange = `abs:${yesterday.valueOf()},${today.valueOf()}`;
  //   [start, end] = parseStartAndEndDate(absoluteTimeRange);
  //   expect([start.valueOf(), end.valueOf()]).toEqual([yesterday.valueOf(), today.valueOf()]);
  // });

  it('can parse time calc mode', () => {
    let timeRange = 'day:8,1';
    expect(parseTimeMode(timeRange)).toEqual('quick');

    timeRange = 'since:';
    expect(parseTimeMode(timeRange)).toEqual(TimeMode.Since);

    timeRange = 'day:';
    expect(parseTimeMode(timeRange)).toEqual(TimeMode.Relative);

    timeRange = 'abs:';
    expect(parseTimeMode(timeRange)).toEqual(TimeMode.Absolute);

    timeRange = 'hour:';
    expect(parseTimeMode(timeRange)).toEqual(undefined);
  });

  // it('can humanize time range', () => {
  //   const timeRangeMapping = {
  //     'day:8,1': '过去 7 天',
  //     'since:1618243200000': '自 2021/04/13 至今日',
  //     'since:1618243200000,1': '自 2021/04/13 至昨日',
  //     'day:9,1': '过去 8 天',
  //     'day:9,0': '过去 0-9 天',
  //     'abs:1619452800000,1620230400000': '从 2021/04/27 至 2021/05/06',
  //     xxx: '时间范围',
  //     'hour:2,1': '时间范围',
  //   };
  //   Object.keys(timeRangeMapping).forEach((timeRange) => {
  //     expect(humanizeTimeRange(timeRange)).toEqual(get(timeRangeMapping, timeRange));
  //   });

  //   const hint = '暂不支持';
  //   expect(humanizeTimeRange('minute:61,1', hint)).toEqual(hint);
  // });
});
