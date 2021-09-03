import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Empty from '../Empty';

export default function EmptyPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Empty 空态' })}</Title>
      <p>{formatMessage({ defaultMessage: '初始化状态或无数据情况下的占位图，可以起到提示或引导操作的功能。' })}</p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '未创建' })}</Subheading>
      <p className="">
        {formatMessage({ defaultMessage: '用户在某一具体模块下，未创建任何内容时，可使用此类型空态。' })}
      </p>
      <Canvas>
        <Story id="data-display-empty--no-data" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '无结果' })}</Subheading>
      <p className="">
        {formatMessage({ defaultMessage: '用户通过筛选、搜索等操作，未找到合适的结果时，可使用此类型空态。' })}
      </p>
      <Canvas>
        <Story id="data-display-empty--no-result" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义' })}</Subheading>
      <p className="">{formatMessage({ defaultMessage: '自定义图片、描述和 Call to Action。' })}</p>
      <Canvas>
        <Story id="data-display-empty--customize" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Empty} />
    </>
  );
}
