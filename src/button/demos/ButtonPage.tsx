import React from 'react';
import { Title, Heading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Button from '../index';

export default function ButtonPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Button 按钮' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '触发后即执行相应操作。按钮通常使用在页面或弹窗等多种场景中，例如新建、删除等。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Button} />
    </>
  );
}
