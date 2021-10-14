import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Radio from '../Radio';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Radio 单选框' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            '用于在多个备选项中选中单个状态。和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="data-entry-radio--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '排列组合' })}</Subheading>
      <Canvas>
        <Story id="data-entry-radio--group" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Radio} />
    </>
  );
}
