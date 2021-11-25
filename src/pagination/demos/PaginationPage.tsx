import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Pagination from '../index';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Pagination 分页' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '分页组建在一个页面中的作用是在大量的信息中，便于快速浏览，定位到相关信息的页面。',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=6334%3A78663">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式变化：全新样式</li>
        <li>Api变化：移除冗余api</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-pagination--demo" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-pagination--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '文本输入框' })}</Subheading>

      <Canvas>
        <Story id="upgraded-pagination--not-show-quick-jumper" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '数字输入框' })}</Subheading>
      <Canvas>
        <Story id="upgraded-pagination--not-show-size-changer" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Pagination} />
    </>
  );
}
