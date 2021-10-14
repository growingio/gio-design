import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Pagination from '../index';

export default function PaginationPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Pagination 分页' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            '分页组件在一个页面中的作用是在大量的信息中，便于快速浏览，定位到相关信息的页面。跳转到上一个页面或下一个页面。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <p>
        {formatMessage({ defaultMessage: '当页面页数少于 10 页时，全部展开显示。' })}
        {formatMessage({ defaultMessage: '当设置 current 参数后，只能通过 onChange 回调改变页码。' })}
      </p>
      <Canvas>
        <Story id="navigation-pagination--default" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Pagination} />
    </>
  );
}
