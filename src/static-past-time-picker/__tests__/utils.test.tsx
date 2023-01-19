import { startOfToday, startOfYesterday } from 'date-fns';
import { TimeMode } from '../interfaces';
import { parseFixedMode, parseStartAndEndDate, parseTimeMode, parseQuickDate } from '../utils';

describe('test utils', () => {
  it('parseTimeMode', () => {
    expect(parseTimeMode('since:1656115199999')).toBe(TimeMode.Since);
    expect(parseTimeMode('since-lt-today')).toBe(TimeMode.Since);
    expect(parseTimeMode('abs:1655596800000,1656115199999')).toBe(TimeMode.Absolute);
    expect(parseTimeMode('day:2,1')).toBe('quick');
    expect(parseTimeMode('day:3,2')).toBe('relative');
    expect(parseTimeMode('xxx:3,2')).toBe(undefined);
  });

  it('parseStartAndEndDate', () => {
    expect(parseStartAndEndDate('since:1656115199999')).toStrictEqual([new Date(1656115199999), startOfToday()]);
    expect(parseStartAndEndDate('since-lt-today:1656115199999')).toStrictEqual([
      new Date(1656115199999),
      startOfYesterday(),
    ]);
    expect(parseStartAndEndDate('xxx:1656115199999')).toStrictEqual([undefined, undefined]);
  });
  it('parseQuickDate', () => {
    expect(parseQuickDate('day:1,0')).toStrictEqual([startOfToday(), startOfToday()]);
    expect(parseQuickDate('day:2,1')).toStrictEqual([startOfYesterday(), startOfYesterday()]);
    expect(parseQuickDate('xxx:1656115199999')).toStrictEqual([undefined, undefined]);
  });
  it('parseFixedMode', () => {
    expect(parseFixedMode('day:2,1')).toBe('yesterday');
    expect(parseFixedMode('since:1656115199999')).toBe('today');
    expect(parseFixedMode('since:')).toBe('today');
    expect(parseFixedMode('since:2,1')).toBe('yesterday');
    expect(parseFixedMode('abs:1655596800000,1656115199999')).toBe(false);
    expect(parseFixedMode('xxx')).toBe(false);
  });
});
