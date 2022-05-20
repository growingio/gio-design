import { render, screen, fireEvent } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import Form from '..';
import Button from '../../button';
import Input from '../../input';
import { sleep } from '../../utils/test';

describe('Form events', () => {
  const errorSpy = jest.spyOn(console, 'warn').mockImplementation(() => {/** nothing */ });
  beforeEach(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });
  it('render form', async () => {
    jest.useFakeTimers();
    const onChange = jest.fn();
    const formChange = jest.fn();
    const formValuesChange = jest.fn()
    const { container } = render(<Form onChange={formChange} onValuesChange={formValuesChange}>
      <Form.Item label="test" name="test" initialValue="monkey" rules={[{ required: true }]}>
        <Input onChange={onChange} />
      </Form.Item>
    </Form>);


    expect(container.querySelector('form')).toBeTruthy();
    expect(container.querySelector('input[value="monkey"]')).toBeTruthy();
    const inputs = container.querySelectorAll('input');

    fireEvent.change(inputs[0], { target: { value: '' } });
    await sleep(300)
    jest.runOnlyPendingTimers();
    expect(onChange).toHaveBeenCalled();

    expect(errorSpy).toHaveBeenCalledWith(
      // eslint-disable-next-line no-template-curly-in-string
      "async-validator:", ["'${name}' is required"]
    );
    expect(container.querySelector('.gio-field-feedback')).toBeTruthy();

    expect(container.querySelector('.gio-field-message')).toHaveAttribute('data-has-feedback', "true");
    expect(formChange).toHaveBeenCalledTimes(1);
    expect(formValuesChange).toHaveBeenCalledTimes(1);
  });
  it('custom trigger', async () => {
    jest.useFakeTimers();
    interface Props {
      value?: string;
      onSelect?: (value: string) => void;
    }
    const MyInput = ({ value, onSelect }: Props) => {
      const [val, setVal] = useState(value ?? '');
      useEffect(() => {
        setVal(value)
      }, [value]);
      return <button value={val} type='button' onClick={() => { onSelect?.(`hello ${val}`) }}>click</button>
    }
    const formValuesChange = jest.fn();
    const onSelect = jest.fn();
    const { container } = render(<Form onValuesChange={v => formValuesChange(v)}>
      <Form.Item label="test" name="test" trigger='onSelect' valuePropName='value' initialValue="monkey" rules={[{ required: true }]}>
        <MyInput onSelect={onSelect} />
      </Form.Item>
    </Form>);

    fireEvent.click(container.querySelector('button'));
    await sleep(300)
    jest.runOnlyPendingTimers();
    expect(onSelect).toHaveBeenCalled();
    expect(formValuesChange).toHaveBeenCalledWith({ "test": "hello monkey" });
  })
  it('customer validateTrigger', async () => {
    jest.useFakeTimers();
    const { container } = render(<Form validateTrigger={["onBlur", "onChange"]}>
      <Form.Item validateTrigger="onSubmit" label="test" name="test" initialValue="" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" >
          Submit 1
        </Button>
      </Form.Item>
    </Form>);


    fireEvent.change(container.querySelector('input'), { target: { value: '' } });
    await sleep(300)
    jest.runOnlyPendingTimers();
    expect(container.querySelector('.gio-field-feedback')).toBeFalsy();
    expect(container.querySelector('.gio-field-message')).toHaveAttribute('data-has-feedback', "false");
    fireEvent.click(container.querySelector('button'));
    await sleep(100)
    jest.runOnlyPendingTimers();
    expect(container.querySelector('.gio-field-message')).toHaveAttribute('data-has-feedback', "true");
  })
  it('test useForm', async () => {
    jest.useFakeTimers();

    const formFinish = jest.fn();
    const formFinishFailed = jest.fn();

    const Demo = () => {
      type Values = { username: string; password: string };
      const [form] = Form.useForm<Values>();
      const handleGenerate = () => {
        form.setFieldsValue({ username: 'Jay Chou', password: '123456' });
      }
      const handleSubmit = () => {
        form.submit()
      }
      const handleReset = () => {
        form.resetFields();
      }
      return (
        <Form<Values> form={form} onFinish={formFinish} onFinishFailed={formFinishFailed}>
          <Form.Item
            label="Username"
            name="username"
            required
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input style={{ width: 300 }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            required
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password style={{ width: 300 }} />
          </Form.Item>

          <Form.Item>
            <div style={{ width: 300, display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" onClick={handleSubmit}>
                Sign in
              </Button>
              <Button type="secondary" onClick={handleReset}>
                Reset
              </Button>
              <Button type="secondary" onClick={handleGenerate}>
                Set Content
              </Button>
            </div>
          </Form.Item>
        </Form>
      )
    };

    const { container } = render(<Demo />);
    expect(container.querySelector('#username')).toHaveValue('');
    expect(container.querySelector('#password')).toHaveValue('');
    fireEvent.click(screen.getByText('Sign in'));
    await sleep(200)
    jest.runAllTimers();
    expect(formFinishFailed).toHaveBeenCalled();
    expect(formFinish).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText('Set Content'));
    await sleep(100);
    jest.runAllTimers();

    expect(container.querySelector('#username')).toHaveValue('Jay Chou');
    expect(container.querySelector('#password')).toHaveValue('123456');

    fireEvent.click(screen.getByText('Reset'));
    await sleep(100);
    jest.runAllTimers();
    expect(container.querySelector('#username')).toHaveValue('');
    expect(container.querySelector('#password')).toHaveValue('');

    fireEvent.click(screen.getByText('Set Content'));
    await sleep(100);
    jest.runAllTimers();
    fireEvent.click(screen.getByText('Sign in'));
    await sleep(200)
    jest.runAllTimers();
    expect(formFinish).toHaveBeenCalled();
  });

  test('should not trigger change when Form.Item have not validate name', async () => {
    jest.useFakeTimers()
    const valuesChange = jest.fn();
    const { container } = render(<Form onValuesChange={(v) => valuesChange(v)}>
      <Form.Item name={null} rules={[{ required: true }]}>
        <Input id='input1' />
      </Form.Item>
      <Form.Item name="name" rules={[{ required: true }]} label="text">
        <Input id="input2" />
      </Form.Item>
    </Form>)
    expect(errorSpy).toHaveBeenCalledWith('Form.Item', '`null` is passed as `name` property')

    fireEvent.change(container.querySelector('#input1'), { target: { value: 'aaa' } });
    await sleep(50);
    jest.runAllTimers();
    expect(valuesChange).not.toHaveBeenCalled();
    fireEvent.change(container.querySelector('#input2'), { target: { value: 'aaa' } });
    await sleep(50);
    jest.runAllTimers();
    expect(valuesChange).toHaveBeenCalled();
  })
  test('FormProvider', async () => {
    jest.useFakeTimers()
    const formFinish = jest.fn();
    const Demo = () => (
      <Form.FormProvider onFormFinish={(name, { values }) => {
        formFinish({ name, values })
      }}>
        <Form name='step1'>
          <Form.Item name="title" initialValue="monkey">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" >
              Submit 1
            </Button>
          </Form.Item>
        </Form>
        <Form name="step2">
          <Form.Item name="desc" initialValue="hello">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">
              Submit 2
            </Button>
          </Form.Item>
        </Form>
      </Form.FormProvider>
    );

    render(<Demo />);
    // screen.debug();
    fireEvent.click(screen.getByText('Submit 1'));
    await sleep(10);

    expect(formFinish).toHaveBeenCalled();
    fireEvent.click(screen.getByText('Submit 2'));
    await sleep(10);

    expect(formFinish).toHaveBeenCalledTimes(2);

    jest.useRealTimers()

  })
});
