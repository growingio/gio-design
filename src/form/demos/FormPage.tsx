import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Form from '../index';

export default function FormPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Form 表单' })}</Title>
      <p>{formatMessage({ defaultMessage: '高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。' })}</p>
      <p>Upgrading Guide</p>
      <ul>
        <li>
          封装自rc-field-form，详情
          <a href="https://www.npmjs.com/package/rc-field-form">rc-dialog</a>
        </li>
        <li>样式改动：颜色替换，warning的padding去掉</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '基础用法' })}</Subheading>
      <Canvas>
        <Story id="upgraded-form--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Item' })}</Subheading>
      <Canvas>
        <Story id="upgraded-form--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '弹窗表单' })}</Subheading>
      <Canvas>
        <Story id="upgraded-form--form-with-modal" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多行表单' })}</Subheading>
      <Canvas>
        <Story id="upgraded-form--multiple-form" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Form} />
    </>
  );
}
