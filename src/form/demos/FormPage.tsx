import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Form as FormWithoutRef } from '../Form';
import { Alert } from '../..';

export default function FormPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Form 表单' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage:
            'Form 表单用于组合和提供表单组件的结构（例如，输入框、复选框和单选按钮等表单元素）。Form 表单使诸如标签、提示和验证信息等元素被组合在一起，为用户创造一个一致的、干净的用户体验。',
        })}
      </Description>
      <Alert
        style={{ margin: '0 0 38px' }}
        message={
          <Description>
            {formatMessage({
              defaultMessage:
                'Form 组件底层使用的是 [rc-field-form](https://github.com/react-component/field-form) 组件，更多详情介绍请查看该库的说明。',
            })}
          </Description>
        }
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '基础用法' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: 'Form 组件最基础的用法。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-form--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '使用 useForm hooks' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            'Form 组件提供了一个强大的 hooks: `Form.useForm()`。该 hooks 包含诸如 `getFieldsValue`、`resetFields`、`setFieldsValue` 和 `validateFields` 等函数，您可以使用该 hooks 随心所欲控制您的 Form 表单。',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage:
            '关于 `Form.useForm()` hooks 的更多使用方法，请查看 [rc-field-form 的 useForm 参数介绍](https://github.com/react-component/field-form#useform)',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-form--use-form-hooks" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '布局方式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: 'Form 组件提供了三种布局方式供您使用。分别是 `horizontal`、`vertical` 和 `inline`。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-form--layout-form" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多种校验方式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            'Form 组件提供了强大的校验功能，并且能够校验多种数据格式。更多介绍请查看 [async-validator](https://github.com/yiminghe/async-validator)。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-form--validate" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义表单控件' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '您可以在 Form 表单中使用您的自定义组件，不一定非要用 HTML 表单元素。只要您的组件遵循以下约定：',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage:
            '1. 提供受控属性 `value`，或其它与 `valuePropName` 的值同名的属性（比如 [基础用法](?path=/docs/upgraded-form--default) 中的 `Checkbox`)。',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage:
            '2. 提供 `onChange` 事件或 `trigger` 的值同名的事件（比如 [基础用法](/story/upgraded-form--default) 中的 `SearchBar`)。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-form--customized-form-controls" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多表单联动' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: 'Form 表单提供了 `Form.Provider` 组件，您在处理多个表单时这会很有用。',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage:
            '`Form.Item` 能接受一个 [Render Props](https://zh-hans.reactjs.org/docs/render-props.html#using-props-other-than-render)，给 children 传入一个函数，此函数的第一个参数为 form 实例。',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage:
            '您可以在 [rc-field-form Provider](https://github.com/react-component/field-form#formprovider) 中了解 `Form.Provider` 更多的 `Props` 介绍。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-form--multiple-form" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '动态表单' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            'Form 表单提供了 `Form.List` 组件，此组件支持 [Render Props](https://zh-hans.reactjs.org/docs/render-props.html#using-props-other-than-render)，给 children 传入一个函数，此函数的参数包含了 `add()` 和 `remove()` 等方法，更多介绍请参考 [rc-field-form List](https://github.com/react-component/field-form#list)',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-form--dynamic-form" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义校验' })}</Subheading>
      <Canvas>
        <Story id="upgraded-form--static-validate" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={FormWithoutRef} />
    </>
  );
}
