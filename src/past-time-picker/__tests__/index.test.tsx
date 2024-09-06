import { fireEvent, render, screen } from '@testing-library/react';
import { addDays, getTime, startOfDay } from 'date-fns';
import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { parseFnsTimeZone } from '../../utils/timeHelper';
import { PastTimePicker } from '../..';
import { TimeMode } from '../../static-past-time-picker/interfaces';

describe('past-time-picker test', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2022-06-29'));
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  it('render', () => {
    render(<PastTimePicker data-testid="my-past-time-picker" value="day:2,1" allowClear placeholder="选择时间" />);
    expect(screen.getByTestId('my-past-time-picker')).toHaveValue('昨日');
    expect(screen.queryByTestId('clean-button')).toBeInTheDocument();
  });

  it('humanizeTimeRange', () => {
    const { rerender } = render(<PastTimePicker value="abs:1655596800000,1656115199999" />);
    expect(screen.getByTestId('past-time-picker')).toHaveValue('从 2022/06/19 至 2022/06/25');
    rerender(<PastTimePicker value="day:15,3" />);
    expect(screen.getByTestId('past-time-picker')).toHaveValue('过去 3-15 天');
    rerender(<PastTimePicker value="day:18,1" />);
    expect(screen.getByTestId('past-time-picker')).toHaveValue('过去 17 天');
    rerender(<PastTimePicker value="xxx" />);
    expect(screen.getByTestId('past-time-picker')).toHaveValue('时间范围');
    rerender(<PastTimePicker value="since:1655596800000" />);
    expect(screen.getByTestId('past-time-picker')).toHaveValue('从 2022/06/19 至今日');
    rerender(<PastTimePicker value="since-lt-today:1655596800000" />);
    expect(screen.getByTestId('past-time-picker')).toHaveValue('从 2022/06/19 至昨日');

    rerender(<PastTimePicker value="week:1,0" experimental />);
    expect(screen.getByTestId('past-time-picker')).toHaveValue('本周(至今日)');
  });
  it('fire visible change event', () => {
    const visibleChange = jest.fn();
    render(<PastTimePicker value="since:1655596800000" placeholder="选择时间" onVisibleChange={visibleChange} />);
    act(() => {
      fireEvent.click(screen.getByTestId('past-time-picker'));
    });
    jest.runAllTimers();
    fireEvent.click(screen.getByText('确定'));
    expect(visibleChange).toHaveBeenCalled();

    act(() => {
      fireEvent.click(screen.getByTestId('past-time-picker'));
    });
    jest.runAllTimers();
    fireEvent.click(screen.getByText('取消'));
    expect(visibleChange).toHaveBeenCalledTimes(4);
  });
  it('fire select event', () => {
    const onSelect = jest.fn();

    const Demo = () => {
      const [val, setVal] = useState<string | undefined>();
      return (
        <PastTimePicker
          value={val}
          placeholder="选择时间"
          onSelect={(v) => {
            setVal(v);
            onSelect(v);
          }}
        />
      );
    };
    render(<Demo />);

    expect(screen.getByTestId('past-time-picker')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByTestId('past-time-picker'));
    });
    act(() => {
      fireEvent.click(screen.getByText('过去7天'));
    });
    jest.runAllTimers();
    fireEvent.click(screen.getByText('确定'));

    jest.runAllTimers();

    expect(onSelect).toHaveBeenCalledWith('day:8,1');
  });

  // it('fire cancel events', () => {
  //   const onSelect = jest.fn();
  //   const onCancel = jest.fn();
  //   const Demo = () => {
  //     const [val, setVal] = useState<string | undefined>('xx:111');
  //     return (
  //       <PastTimePicker
  //         value={val}
  //         modes={[TimeMode.Since]}
  //         placeholder="选择时间"
  //         onSelect={(v) => {
  //           setVal(v);
  //           onSelect(v);
  //         }}
  //         onCancel={onCancel}
  //       />
  //     );
  //   };
  //   render(<Demo />);

  //   expect(screen.getByTestId('past-time-picker')).toBeInTheDocument();
  //   act(() => {
  //     fireEvent.click(screen.getByTestId('past-time-picker'));
  //   });
  //   act(() => {
  //     fireEvent.click(screen.getByText('自某天以后'));
  //   });
  //   fireEvent.click(screen.getByText('取消'));
  //   expect(onCancel).toHaveBeenCalled();

  //   act(() => {
  //     fireEvent.click(screen.getByTestId('past-time-picker'));
  //   });
  //   act(() => {
  //     fireEvent.click(screen.getByText('自某天以后'));
  //   });
  //   const startDay = startOfDay(addDays(new Date(), -5));
  //   const timeRange = `since:${getTime(startDay)}`;
  //   fireEvent.click(screen.getByTitle(parseFnsTimeZone(startDay, 'yyyy-MM-dd')));
  //   jest.runAllTimers();
  //   fireEvent.click(screen.getByText('确定'));

  //   jest.runAllTimers();

  //   expect(onSelect).toHaveBeenCalledWith(timeRange);
  // });

  // it('fire  events', () => {
  //   const onSelect = jest.fn();
  //   const onCancel = jest.fn();
  //   const Demo = () => {
  //     const [val, setVal] = useState<string | undefined>('xx:111');
  //     return (
  //       <PastTimePicker
  //         value={val}
  //         modes={[TimeMode.Since]}
  //         placeholder="选择时间"
  //         onSelect={(v) => {
  //           setVal(v);
  //           onSelect(v);
  //         }}
  //         onCancel={onCancel}
  //       />
  //     );
  //   };
  //   render(<Demo />);

  //   expect(screen.getByTestId('past-time-picker')).toBeInTheDocument();
  //   act(() => {
  //     fireEvent.click(screen.getByTestId('past-time-picker'));
  //   });
  //   act(() => {
  //     fireEvent.click(screen.getByText('自某天以后'));
  //   });

  //   const startDay = startOfDay(addDays(new Date(), -5));
  //   const timeRange = `since:${getTime(startDay)}`;
  //   fireEvent.click(screen.getByTitle(parseFnsTimeZone(startDay, 'yyyy-MM-dd')));
  //   jest.runAllTimers();
  //   fireEvent.click(screen.getByText('确定'));

  //   jest.runAllTimers();

  //   expect(onSelect).toHaveBeenCalledWith(timeRange);
  // });
});
