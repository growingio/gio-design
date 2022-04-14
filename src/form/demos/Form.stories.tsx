import React, { useEffect, useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { RuleObject } from 'rc-field-form/lib/interface';
import { DeleteOutlined } from '@gio-design/icons';
import Form, { FormInstance } from '../index';
import { Form as FormWithoutRef } from '../Form';
import Docs from './FormPage';
import { FormLayout, FormProps } from '../interface';
import '../style';
import '../../input/style';
import '../../button/style';
import { Button, Checkbox, Divider, Input, Modal, SearchBar, Toast } from '../../index';
import Switch from '../../switch';
import PriceInput from './PriceInput';

export default {
  title: 'Upgraded/Form',
  component: FormWithoutRef,
  subcomponents: {
    'Form.Item': Form.Item,
  },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta<FormProps>;

type DefaultDataType = { search: string; username: string; password: string; remember: boolean };

const DefaultTemplate: Story<FormProps<DefaultDataType>> = (props) => (
  <Form<DefaultDataType> {...props}>
    <Form.Item label="Search" name="search" trigger="onSearch" getValueFromEvent={(text) => text}>
      <SearchBar style={{ width: 300 }} />
    </Form.Item>

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

    <Form.Item name="remember" valuePropName="checked">
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item>
      <Button type="primary" style={{ width: 300 }} htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export const Default: Story<FormProps<DefaultDataType>> = DefaultTemplate.bind({});
Default.args = {
  name: 'default',
  labelWidth: 150,
  initialValues: { remember: true },
  onFinish: action('onFinish'),
  onFinishFailed: action('onFinishFailed'),
  autoComplete: 'off',
};

export const UseFormHooks = () => {
  type Values = { username: string; password: string };
  const [form] = Form.useForm<Values>();

  const [fetching, setFetching] = useState(false);
  const [generating, setGenerating] = useState(false);

  const Apis = {
    login: (formValues: Values) =>
      new Promise<{ success: boolean; data: Values }>((resolve) => {
        setFetching(true);
        setTimeout(() => {
          setFetching(false);
          resolve({ success: true, data: formValues });
        }, 1500);
      }),
    generate: () =>
      fetch('https://random-data-api.com/api/name/random_name')
        .then((response) => response.json())
        .then((res) => ({ ...res, password: res.uid }))
        .catch(() => ({ name: 'Jay Chou', password: '123456' })),
  };

  const handleSubmit = async () => {
    action('handleSubmit')();
    const values = await form.validateFields().catch(action('validateFieldsCatch'));
    if (values) {
      const { success } = await Apis.login(values);
      if (success) {
        Toast.success('Sign in Successful!');
      }
    }
  };

  const handleReset = () => {
    action('handleReset')();
    form.resetFields();
  };

  const handleGenerate = async () => {
    setGenerating(true);
    const result = await Apis.generate().finally(() => setGenerating(false));
    action('fetch result')(result);
    form.setFieldsValue({ username: result.name, password: result.password });
  };

  return (
    <>
      <Form<Values> form={form}>
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
            <Button type="primary" onClick={handleSubmit} loading={fetching}>
              Sign in
            </Button>
            <Button type="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button type="secondary" loading={generating} onClick={handleGenerate}>
              Generate Content
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export const LayoutForm = () => {
  const [layout, setLayout] = useState<FormLayout>('horizontal');

  type DataType = {
    layout: FormLayout;
    username: string;
    password: string;
    remember: boolean;
  };

  const handleValuesChange = (changedValues: DataType) => {
    action('onValuesChange')(changedValues);
    if (changedValues && 'layout' in changedValues) {
      setLayout(changedValues.layout);
    }
  };

  return (
    <div>
      <Form<DataType>
        layout={layout}
        requiredMark
        initialValues={{ layout: 'horizontal' }}
        onValuesChange={handleValuesChange}
      >
        <Form.Item name="layout" label="Layout">
          <Switch
            options={[
              { label: 'Horizontal', value: 'horizontal' },
              { label: 'Vertical', value: 'vertical' },
              { label: 'Inline', value: 'inline' },
            ]}
          />
        </Form.Item>
        <Divider />
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

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" style={{ width: 300 }} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export const Validate = () => {
  const hasExisted = (value: string) => Promise.resolve(Boolean(value));

  type DataType = {
    username: string;
    email: `${string}@${string}.${string}`;
    password: string;
    confirmPassword: string;
  };

  return (
    <Form<DataType>>
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: '用户名不能为空',
          },
          {
            max: 12,
            message: '用户名字符数不能超过 12',
          },
          {
            min: 2,
            message: '用户名字符数不能少于 2',
          },
        ]}
      >
        <Input placeholder="请输入您的用户名" style={{ width: 300 }} />
      </Form.Item>
      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          {
            required: true,
            message: '邮箱不能为空',
          },
          {
            type: 'email',
            message: '您的邮箱格式不正确',
          },
          {
            validator: async (_, value) => {
              const result = await hasExisted(value);
              if (result) {
                return Promise.reject(new Error('您输入的邮箱已存在，请重新输入'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input placeholder="请输入您的邮箱" style={{ width: 300 }} />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: '密码不能为空',
          },
        ]}
      >
        <Input.Password placeholder="请输入您的密码" style={{ width: 300 }} />
      </Form.Item>
      <Form.Item
        label="确认密码"
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: '密码不能为空',
          },
          (form) => {
            const password = form.getFieldValue('password');
            return {
              validator: (_, confirmPassword) => {
                if (confirmPassword !== password) {
                  return Promise.reject(new Error('您输入的密码不一致，请重新输入'));
                }
                return Promise.resolve();
              },
            };
          },
        ]}
      >
        <Input.Password placeholder="请确认您的密码" style={{ width: 300 }} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" style={{ width: 300 }}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export const CustomizedFormControls = () => {
  type Values = {
    price: {
      number: number;
      currency: string;
    };
  };
  const onFinish = (values: Values) => {
    action('Received values from form: ')(values);
    Toast.success(`您输入的价格为: ${values.price.number} ${values.price.currency}`);
  };

  const checkPrice = (_rule: RuleObject, value: Values['price']) => {
    if (value.number > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Price must be greater than zero!'));
  };

  return (
    <Form<Values>
      name="customized_form_controls"
      onFinish={onFinish}
      initialValues={{
        price: {
          number: 0,
          currency: 'rmb',
        },
      }}
    >
      <Form.Item name="price" label="Price" rules={[{ validator: checkPrice }]}>
        <PriceInput />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

// 模态框关闭时重置表单
const useResetFormOnCloseModal = ({ form, visible }: { form: FormInstance; visible: boolean }) => {
  const prevVisibleRef = useRef<boolean>();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;

  useEffect(() => {
    if (!visible && prevVisible && form) {
      form.resetFields();
    }
  }, [visible, form, prevVisible]);
};

export const MultipleForm = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [stepsForm] = Form.useForm();

  useResetFormOnCloseModal({
    visible: modalVisible,
    form: stepsForm,
  });

  return (
    <Form.FormProvider
      onFormFinish={(name, { values, forms }) => {
        if (name === 'stepsForm') {
          const { todoForm } = forms;
          const steps = todoForm.getFieldValue('steps') || [];
          todoForm.setFieldsValue({ steps: [...steps, values.stepName] });
          setModalVisible(false);
        }
      }}
    >
      <Form name="todoForm" colon style={{ width: 400 }}>
        <Form.Item name="title" label="Todo Title" required rules={[{ required: true, message: '请输入 Todo 标题' }]}>
          <Input style={{ width: '100%' }} autoComplete="off" />
        </Form.Item>
        <Form.Item label="Steps">
          {(form) => {
            const steps: string[] = form.getFieldValue('steps') || [];
            if (steps.length) {
              return (
                <ol style={{ paddingLeft: 16, margin: 0, color: '#242e59' }}>
                  {steps.map((step) => (
                    <li key={step} style={{ margin: '0 0 8px' }}>
                      {step}
                    </li>
                  ))}
                </ol>
              );
            }
            return <span style={{ color: '#242e59' }}>No steps yet.</span>;
          }}
        </Form.Item>
        <Form.Item>
          <Button htmlType="button" type="secondary" style={{ width: '100%' }} onClick={() => setModalVisible(true)}>
            Add Step
          </Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Step"
        onOk={() => {
          stepsForm.submit();
        }}
      >
        <Form name="stepsForm" form={stepsForm}>
          <Form.Item name="stepName" labelWidth="0px" required rules={[{ required: true, message: '请输入步骤' }]}>
            <Input style={{ width: '100%' }} placeholder="Enter Step" autoComplete="off" />
          </Form.Item>
        </Form>
      </Modal>
    </Form.FormProvider>
  );
};

export const DynamicForm = () => (
  <Form name="todoForm" style={{ width: '500px' }}>
    <Form.List
      name="todoList"
      rules={[
        {
          validator: async (_, todoList) => {
            if (!todoList || todoList.length < 2) {
              return Promise.reject(new Error('至少有两条数据'));
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index) => (
            <div style={{ display: 'flex' }}>
              <Form.Item
                validateTrigger={['onChange', 'onBlur']}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入内容',
                  },
                ]}
                {...field}
              >
                <Input style={{ width: '324px', marginRight: 8 }} placeholder="Place enter a todo" autoComplete="off" />
              </Form.Item>
              <Button.IconButton
                type="text"
                htmlType="button"
                onClick={() => remove(index)}
                aria-label="Remove This Todo"
              >
                <DeleteOutlined />
              </Button.IconButton>
            </div>
          ))}
          <Form.Item>
            <Button
              style={{ width: 'calc(100% - 36px - 8px)' }}
              htmlType="button"
              type="secondary"
              onClick={() => add()}
            >
              Add Todo
            </Button>
          </Form.Item>
          <Form.Item>
            <div role="alert" style={{ color: 'var(--red-3, #ec134b)', fontSize: '12px' }}>
              {errors}
            </div>
          </Form.Item>
        </>
      )}
    </Form.List>
  </Form>
);

export const StaticValidate = () => (
  <Form>
    <Form.Item label="User Id" help="帮助信息">
      <Input style={{ width: 300 }} />
    </Form.Item>

    <Form.Item label="Name" feedbackType="error" feedback="名称不能为空">
      <Input style={{ width: 300 }} />
    </Form.Item>

    <Form.Item label="Password" feedbackType="warning" feedback="密码长度尽量大于 6 位">
      <Input.Password style={{ width: 300 }} />
    </Form.Item>

    <Form.Item label="Email" feedbackType="validating" feedback="正在检测您的邮箱是否重复">
      <Input style={{ width: 300 }} />
    </Form.Item>

    <Form.Item label="Email" feedbackType="success" feedback="验证成功">
      <Input style={{ width: 300 }} />
    </Form.Item>
  </Form>
);
