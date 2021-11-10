import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Default, FormItems, FormWithModal, MultipleForm } from '../demos/Form.stories';
import RefForm from '../index';
import { FormProvider } from '../context';
import { FormItemProps } from '../interface';
import Input from '../../input';
import { toArray, hasValidName } from '../util';

describe('Testing form', () => {
  it('basic form', () => {
    render(<Default {...Default.args} />);
    expect(screen.getAllByText('用户名')).toHaveLength(1);
  });

  it('form items', () => {
    render(<FormItems {...FormItems.args} />);
    expect(screen.getAllByPlaceholderText('我是一个Item')).toHaveLength(1);
  });

  it('form with modal', () => {
    render(<FormWithModal />);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(screen.getAllByText('新建账号')).toHaveLength(1);
  });

  it('multiple form', () => {
    render(<MultipleForm />);
    expect(screen.getAllByText(/label-*/)).toHaveLength(6);
  });

  it('should accept a ref', () => {
    const {
      result: { current: formRef },
    } = renderHook(() => React.useRef(null));

    render(<RefForm ref={formRef} />);
  });

  it('can wrapped in FormProvider', (done) => {
    const onFormChange = (name: string) => {
      expect(name).toEqual('form1');
      done();
    };
    const { container } = render(
      <FormProvider onFormChange={onFormChange}>
        <RefForm name="form1">
          <RefForm.Item name="name1" validateTrigger="onClick">
            <input type="text" />
          </RefForm.Item>
        </RefForm>
        <RefForm name="form2">
          <RefForm.Item name="name2">
            <input type="text" id="gio-test-demo" />
          </RefForm.Item>
        </RefForm>
      </FormProvider>
    );
    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '123' } });
    expect(container.getElementsByTagName('input')[0].value).toEqual('123');
  });

  it('item with function children', () => {
    const args: FormItemProps = {
      children: () => <Input placeholder="我是一个Item" />,
    };
    render(<RefForm.Item {...args} />);
    expect(screen.getAllByPlaceholderText('我是一个Item')).toHaveLength(1);
  });

  it('should pass custom trigger', () => {
    render(
      <RefForm>
        <RefForm.Item
          name="username"
          validateTrigger="onFocus"
          rules={[{ required: true, message: 'validate message' }]}
        >
          <input type="text" onFocus={() => null} />
        </RefForm.Item>
      </RefForm>
    );
    fireEvent.focus(screen.getByRole('textbox'));
    waitFor(() => {
      expect(screen.getByText('validate message')).toBeTruthy();
    });
  });

  it('can accept text as children', () => {
    render(<RefForm.Item name="text">abc</RefForm.Item>);
    expect(screen.getByText('abc')).toBeTruthy();
  });

  it('have feedback with icon', () => {
    const { container } = render(<RefForm.Item feedbackIcon feedback="feedback message" feedbackType="warning" />);
    expect(container.getElementsByClassName('gio-field-children-icon')).toHaveLength(1);
  });
});

// ===== test util =====

describe('toArray', () => {
  it('should convert string to array', () => {
    expect(toArray('abc')).toContainEqual('abc');
    expect(toArray(['abc'])[0]).toEqual('abc');
  });

  it('should ignore undefined and false value', () => {
    expect(toArray(false)).toHaveLength(0);
    expect(toArray(undefined)).toHaveLength(0);
  });
});

describe('hasValidName', () => {
  it('should reject undefined null value', () => {
    expect(hasValidName(undefined)).toBeFalsy();
    // eslint-disable-next-line
    const warn = console.assert;
    // eslint-disable-next-line
    console.warn = jest.fn();
    expect(hasValidName(null)).toBeFalsy();
    // eslint-disable-next-line
    console.warn = warn;
  });
  it('should accept a string or string[] value', () => {
    expect(hasValidName('abc')).toBeTruthy();
    expect(hasValidName(['abc'])).toBeTruthy();
  });
});

// =====  add branch test ======
describe('improve branch test', () => {
  it('render other props', () => {
    render(
      <RefForm colon requiredMark={false}>
        <RefForm.Item
          trigger="onClick"
          labelWidth={100}
          inputWidth={100}
          colon
          labelAlign="right"
          help="help"
          required
          title="test"
          htmlFor="test"
        >
          <Input />
        </RefForm.Item>
      </RefForm>
    );
  });

  it('requiredMark is optional', () => {
    render(
      <RefForm requiredMark="optional">
        <RefForm.Item required={false} marker={<span>123</span>}>
          <Input id="gio-demo" />
        </RefForm.Item>
      </RefForm>
    );
  });
});
