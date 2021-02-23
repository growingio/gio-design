import { renderHook, act } from '@testing-library/react-hooks';
import { noop } from 'lodash';
import moment from 'moment';
import useDatePicker from '../hook/useDateRangePicker';

const props = {
  value: '',
  onChange: noop,
  showFooter: true,
};

describe('Testing useDatePicker', () => {
  it('useDateRangePicker panelField', () => {
    const { result } = renderHook(() => useDatePicker(props));
    const { panelField } = result.current;

    act(() => {
      panelField.localSelect('');
    });
    expect(panelField.open).toBe(false);
    expect(panelField.timeRange).toBe('');

    act(() => {
      panelField.localChange('');
    });
    expect(panelField.timeRange).toBe('');

    act(() => {
      panelField.onBlur();
    });
    expect(panelField.open).toBe(false);
  });

  it('useDateRangePicker footerField', () => {
    const { result } = renderHook(() => useDatePicker(props));
    const { footerField, inputField, panelField } = result.current;

    act(() => {
      footerField.onCancel();
    });

    expect(inputField.leftInputTimeRange).toBe('');
    expect(inputField.rightInputTimeRange).toBe('');
    expect(panelField.timeRange).toBe(props.value);
    expect(panelField.open).toBe(false);

    act(() => {
      footerField.onConfirm();
    });

    expect(panelField.timeRange).toBe('');
    expect(inputField.leftInputTimeRange).toBe('');
    expect(inputField.rightInputTimeRange).toBe('');
    expect(panelField.open).toBe(false);
  });

  it('useDateRangePicker inputField', () => {
    const { result } = renderHook(() => useDatePicker(props));
    const { inputField, panelField } = result.current;

    act(() => {
      inputField.debounceInputChange(moment(), 'left');
    });
    expect(panelField.timeRange).toBe('');

    act(() => {
      inputField.debounceInputChange(moment(), 'right');
    });
    expect(panelField.timeRange).toBe('');

    act(() => {
      inputField.handleInputClick();
    });
    expect(panelField.open).toBe(false);

    const e = { target: {} };
    e.target.value = '';
    act(() => {
      inputField.handleLeftInputChange(e);
    });
    expect(inputField.leftInputTimeRange).toBe('');

    act(() => {
      inputField.handleRightInputChange(e);
    });
    expect(inputField.rightInputTimeRange).toBe('');
  });

  it('useDateRangePicker showfooter', () => {
    const { result } = renderHook(() =>
      useDatePicker({
        value: '',
        onChange: noop,
        showFooter: true,
      })
    );
    const { inputField, panelField } = result.current;

    act(() => {
      panelField.localSelect('');
    });
    expect(panelField.open).toBe(false);
    expect(panelField.timeRange).toBe('');

    act(() => {
      panelField.onBlur();
    });
    expect(panelField.open).toBe(false);
  });
});
