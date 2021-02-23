import { renderHook, act } from '@testing-library/react-hooks';
import { noop } from 'lodash';
import useDatePicker from '../hook/useDatePicker';

const props = {
  value: '',
  onChange: noop,
  showFooter: true,
};

describe('Testing useDatePicker', () => {
  it('useDatePicker panelField', () => {
    const { result } = renderHook(() => useDatePicker(props));
    const { panelField } = result.current;

    act(() => {
      panelField.onSelect('');
    });
    expect(panelField.open).toBe(false);
    expect(panelField.localValue).toBe('');

    act(() => {
      panelField.onChange('');
    });
    expect(panelField.localValue).toBe('');

    act(() => {
      panelField.onblur();
    });
    expect(panelField.open).toBe(false);
  });

  it('useDatePicker footerField', () => {
    const { result } = renderHook(() => useDatePicker(props));
    const { footerFiled, inputField, panelField } = result.current;

    act(() => {
      footerFiled.onCancel();
    });

    expect(inputField.inputTime).toBe('');
    expect(panelField.localValue).toBe(props.value);
    expect(panelField.open).toBe(false);

    act(() => {
      footerFiled.onConfirm();
    });

    expect(inputField.inputTime).toBe('');
    expect(panelField.open).toBe(false);
  });

  it('useDatePicker inputField', () => {
    const { result } = renderHook(() => useDatePicker(props));
    const { inputField, panelField } = result.current;

    const e = { target: {} };
    e.target.value = '';
    act(() => {
      inputField.handleInputChange(e);
    });
    expect(inputField.inputTime).toBe('');

    act(() => {
      inputField.debounceTimeChange(e);
    });

    expect(panelField.localValue).toBe('');

    act(() => {
      inputField.handleInputClick();
    });
    expect(panelField.open).toBe(false);
  });

  it('useDatePicker showfooter', () => {
    const { result } = renderHook(() =>
      useDatePicker({
        value: '',
        onChange: noop,
        showFooter: false,
      })
    );
    const { panelField } = result.current;

    act(() => {
      panelField.onblur();
    });
    expect(panelField.open).toBe(false);

    act(() => {
      panelField.onSelect('');
    });
    expect(panelField.localValue).toBe('');
    expect(panelField.open).toBe(false);
  });
});
