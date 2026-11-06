import { getAbsoluteDateTime, getAbsoluteTimeTexts, getCalendarDate, isValidTimeText } from '../absoluteTime';

let originalTimezone: string | null = null;

beforeEach(() => {
  originalTimezone = localStorage.getItem('timezone');
  localStorage.setItem('timezone', 'Asia/Shanghai');
});

afterEach(() => {
  if (originalTimezone === null) localStorage.removeItem('timezone');
  else localStorage.setItem('timezone', originalTimezone);
});

test.each(['', '00:00:00', '09:08:07', '23:59:59'])('accepts valid time %s', (text) => {
  expect(isValidTimeText(text)).toBe(true);
});

test.each(['24:00:00', '12:60:00', '12:00:60', '9:00:00', '12:00', '12:00:00.999', ' 12:00:00', '12:00:00 ', ' '])(
  'rejects invalid or incomplete time %s',
  (text) => {
    expect(isValidTimeText(text)).toBe(false);
  }
);

test('missing and non-absolute ranges use whole-day defaults', () => {
  expect(getAbsoluteTimeTexts()).toEqual(['00:00:00', '23:59:59']);
  expect(getAbsoluteTimeTexts('day:8,1')).toEqual(['00:00:00', '23:59:59']);
});

test('absolute values display time in the configured timezone', () => {
  const range = 'abs:1792456245000,1792458930999';
  expect(getAbsoluteTimeTexts(range)).toEqual(['08:30:45', '09:15:30']);
  localStorage.setItem('timezone', 'UTC');
  expect(getAbsoluteTimeTexts(range)).toEqual(['00:30:45', '01:15:30']);
});

test('calendar dates are midnight in the configured timezone', () => {
  expect(getCalendarDate(new Date('2026-10-20T08:30:45+08:00'))?.toISOString()).toBe('2026-10-19T16:00:00.000Z');
  expect(getCalendarDate()).toBeUndefined();
  expect(getCalendarDate(new Date(NaN))).toBeUndefined();
});

test.each([
  { text: '', end: false, expected: '2026-10-19T16:00:00.000Z' },
  { text: '', end: true, expected: '2026-10-20T15:59:59.999Z' },
  { text: '08:30:45', end: false, expected: '2026-10-20T00:30:45.000Z' },
  { text: '08:30:45', end: true, expected: '2026-10-20T00:30:45.999Z' },
])('combines date and time with inclusive second boundaries: %o', ({ text, end, expected }) => {
  expect(getAbsoluteDateTime(new Date('2026-10-20T08:30:45.123+08:00'), text, end)?.toISOString()).toBe(expected);
});

test('missing dates, invalid dates and invalid times do not create a timestamp', () => {
  expect(getAbsoluteDateTime(undefined, '12:00:00', false)).toBeUndefined();
  expect(getAbsoluteDateTime(new Date(NaN), '', true)).toBeUndefined();
  expect(getAbsoluteDateTime(new Date('2026-10-20T00:00:00+08:00'), '25:00:00', false)).toBeUndefined();
});

test('spring daylight-saving day has 23 hours and rejects a skipped hour', () => {
  localStorage.setItem('timezone', 'America/Los_Angeles');
  const date = new Date('2026-03-08T00:00:00-08:00');
  expect(getAbsoluteDateTime(date, '', false)?.toISOString()).toBe('2026-03-08T08:00:00.000Z');
  expect(getAbsoluteDateTime(date, '', true)?.toISOString()).toBe('2026-03-09T06:59:59.999Z');
  expect(getAbsoluteDateTime(date, '02:30:00', false)).toBeUndefined();
});

test('autumn daylight-saving day has 25 hours', () => {
  localStorage.setItem('timezone', 'America/Los_Angeles');
  const date = new Date('2026-11-01T00:00:00-07:00');
  expect(getAbsoluteDateTime(date, '', false)?.toISOString()).toBe('2026-11-01T07:00:00.000Z');
  expect(getAbsoluteDateTime(date, '', true)?.toISOString()).toBe('2026-11-02T07:59:59.999Z');
});

test.each(['2026-11-01T01:30:00-07:00', '2026-11-01T01:30:00-08:00'])(
  'unchanged repeated hour preserves its original absolute instant: %s',
  (iso) => {
    localStorage.setItem('timezone', 'America/Los_Angeles');
    const date = new Date(iso);
    expect(getAbsoluteDateTime(date, '01:30:00', false)?.getTime()).toBe(date.getTime());
    expect(getAbsoluteDateTime(date, '01:30:00', true)?.getTime()).toBe(date.getTime() + 999);
  }
);
