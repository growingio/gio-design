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
            '用于在多个备选项中选中单个状态。和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。:',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4078%3A37260">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>不支持多选</li>
      </ul>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-radio--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-radio--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '分组' })}</Subheading>
      <Canvas>
        <Story id="upgraded-radio--disable" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '不定态' })}</Subheading>
      <Canvas>
        <Story id="upgraded-radio--group" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Radio} />
    </>
  );
}
