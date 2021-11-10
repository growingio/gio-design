import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Loading from '../Loading';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Loading 加载中' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '在当前页面正中打开一个浮层',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage: '默认显示状态，可通过 Controls 来控制各种属性。',
        })}
      </p>
      <Canvas>
        <Story id="legacy-loading--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '赋予内容加载状态' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage: '可以直接把内容嵌入到 Loading 中，将现有容器变为加载状态。',
        })}
      </p>
      <Canvas>
        <Story id="legacy-loading--container" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义符号' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage: '替换默认的加载图形，可以是任意的元素。',
        })}
      </p>
      <Canvas>
        <Story id="legacy-loading--indicator" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '设置延时' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage: '延迟显示 loading 效果。当 spinning 状态在 delay 时间内结束，则不显示 loading 状态。',
        })}
      </p>
      <Canvas>
        <Story id="legacy-loading--delay" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Loading} />
    </>
  );
}
