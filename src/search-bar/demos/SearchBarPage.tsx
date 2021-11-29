import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import SearchBar from '../index';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'SearchBar 分页' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '在所有内容中，通过输入内容的关键信息筛选出某个内容。',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4078%3A43861">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式：两种大小，新边框样式</li>
        <li>Api：删除冗余api</li>
        <li>包装的input，type=text，</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-searchbar--demo" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-searchbar--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'disable' })}</Subheading>

      <Canvas>
        <Story id="upgraded-searchbar--disabled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'disable with value' })}</Subheading>
      <Canvas>
        <Story id="upgraded-searchbar--disable-value" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={SearchBar} />
    </>
  );
}
