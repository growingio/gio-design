import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Checkbox from '../Checkbox';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Checkbox 多选框' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '在一组可选项中进行多项选择:',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4078%3A37260">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li> checkbox 支持多选</li>
      </ul>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-checkbox--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-checkbox--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '分组' })}</Subheading>
      <Canvas>
        <Story id="upgraded-checkbox--group" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '不定态' })}</Subheading>
      <Canvas>
        <Story id="upgraded-checkbox--indeterminate" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Checkbox} />
    </>
  );
}
