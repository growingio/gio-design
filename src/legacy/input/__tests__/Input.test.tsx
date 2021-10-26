import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '..';
import { Default, InputNumberCase, PasswordCase, TextAreaCase } from '../Input.stories';

describe('Testing input', () => {
  it('basic input', () => {
    render(<Default {...Default.args} />);
    expect(screen.getByRole('textbox').getAttribute('value')).toEqual('333');

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '666' } });
    expect(screen.getByRole('textbox').getAttribute('value')).toEqual('666');
  });

  it('input number case', () => {
    render(<InputNumberCase {...(InputNumberCase.args as any)} />);
    fireEvent.click(screen.getByRole('img', { name: 'up-filled' }));
    expect(screen.getByRole('textbox').getAttribute('value')).toEqual('1');
  });

  it('password input', () => {
    render(<PasswordCase {...PasswordCase.args} />);
    fireEvent.click(screen.getByRole('img', { name: 'eye-outlined' }));
    fireEvent.click(screen.getByRole('img', { name: 'eye-slash-outlined' }));
    fireEvent.click(screen.getByRole('img'));
    expect(screen.getByDisplayValue('x')).toBeTruthy();
  });

  it('textarea input', () => {
    render(<TextAreaCase {...TextAreaCase.args} />);
    expect(screen.getByRole('textbox').innerHTML).toEqual('hello');
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'text' } });
    expect(screen.getByRole('textbox').innerHTML).toEqual('text');
  });

  it('should support maxLength', () => {
    const { container } = render(<Input maxLength={3} />);
    expect(container.getElementsByClassName('gio-legacy-input')).toHaveLength(1);
  });

  it('should support prefix and suffix element', () => {
    const { container } = render(
      <Input
        value="www.growingio.com"
        prefix={<span className="prefix-path">http://</span>}
        prefixWidth={100}
        suffix={<span className="suffix-path">/index.html</span>}
        suffixWidth={60}
      />
    );
    expect(container.getElementsByClassName('prefix-path')[0].innerHTML).toEqual('http://');
    expect(container.getElementsByClassName('suffix-path')[0].innerHTML).toEqual('/index.html');
  });

  it('should run onChange when input accept change event', () => {
    let val = '';
    render(
      <Input
        onChange={(e) => {
          val = e.target.value;
        }}
        onPressEnter={() => {
          val = 'press enter';
        }}
      />
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '123' } });
    expect(val).toBe('123');
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    expect(val).toBe('press enter');
  });

  it('should support size and onFocus', () => {
    const onFocus = jest.fn();
    render(<Input readOnly size="large" onFocus={onFocus} />);
    fireEvent.focus(screen.getByRole('textbox'));
    expect(onFocus).toBeCalled();
  });

  it('password input disabled', () => {
    render(<Input.Password value="password" disabled />);
  });

  it('should not change if the value is not between min and max, or the value is not a number', () => {
    let val = '';
    const { rerender } = render(
      <Input.InputNumber
        max={5}
        min={1}
        value={val as any}
        onChange={(n: any) => {
          val = n;
        }}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '5' } });
    expect(val).toBe(5);
    rerender(
      <Input.InputNumber
        max={5}
        min={1}
        value={val as any}
        onChange={(n: any) => {
          val = n;
        }}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '6' } });
    expect(val).toBe(6);
    rerender(
      <Input.InputNumber
        max={5}
        min={1}
        value={val as any}
        onChange={(n: any) => {
          val = n;
        }}
      />
    );

    fireEvent.blur(screen.getByRole('textbox'));
    expect(val).toBe(5);
    rerender(
      <Input.InputNumber
        max={5}
        min={1}
        value={val as any}
        onChange={(n: any) => {
          val = n;
        }}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '0' } });
    expect(val).toBe(0);
    rerender(
      <Input.InputNumber
        max={5}
        min={1}
        value={val as any}
        onChange={(n: any) => {
          val = n;
        }}
      />
    );

    fireEvent.blur(screen.getByRole('textbox'));
    expect(val).toBe(1);
  });

  it('input number when there not onChange', () => {
    render(<Input.InputNumber {...({} as any)} />);
    fireEvent.change(screen.getByRole('textbox', { target: { value: '' } } as any));
    fireEvent.click(screen.getByRole('img', { name: 'up-filled' }));
    fireEvent.click(screen.getByRole('img', { name: 'down-filled' }));
    fireEvent.blur(screen.getByRole('textbox'));
  });

  it('input number should trigger onBlur', () => {
    const onBlur = jest.fn();
    const props = {
      value: '',
      onBlur,
      disabled: true,
      readonly: true,
    } as any;
    render(<Input.InputNumber {...props} />);
    fireEvent.blur(screen.getByRole('textbox'));
    expect(onBlur).toHaveBeenCalled();
  });

  it('input number customDisplay', () => {
    const customDisplay = {
      formatter: (value: any) => String(value).replace(/formatter/, '0'),
      parser: (value: any) => String(value).replace(/parser/, '0'),
    };
    const onChange = jest.fn();
    const props = {
      value: 'formatter',
      customDisplay,
      onChange,
    } as any;
    render(<Input.InputNumber {...props} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'parser' } });
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('input password can not click when disabled', () => {
    render(<Input.Password value="123" disabled />);
    fireEvent.click(screen.getByRole('img', { name: 'eye-outlined' }));
  });

  it('textarea-input should support disabled', () => {
    render(<Input.TextArea disabled value="disabled" maxLength={10} showCount />);
    expect(screen.getByText('disabled')).toBeTruthy();
  });

  it('textarea-input should trigger onChange when input event happens', () => {
    let val = '';
    render(
      <Input.TextArea
        onChange={(e) => {
          val = e.target.value;
        }}
        resize
        placeholder="test"
      />
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '123' } });
    expect(val).toBe('123');
  });

  it('textarea-input should change the height when input many characters in the textarea', () => {
    const val = '';
    const { rerender } = render(<Input.TextArea value={val} autosize />);
    rerender(<Input.TextArea value={'abc'.repeat(100)} autosize />);
    expect(screen.getByRole('textbox').innerHTML).toBe('abc'.repeat(100));
  });
});
