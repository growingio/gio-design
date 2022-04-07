import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import { useIntl } from 'react-intl';
import Link from '../index';

export default function LinkPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Link 链接' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage:
            '可以通过 href 属性创建通向其他网页、文件、同一页面内的位置、电子邮件地址或任何其他 URL 的超链接。',
        })}
      </Description>

      <Subtitle>{formatMessage({ defaultMessage: '使用场景' })}</Subtitle>
      <Description>
        {formatMessage({ defaultMessage: '向其他网页、文件、同一页面内的位置、电子邮件地址或任何其他 URL 跳转。' })}
      </Description>

      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=6749%3A65551"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Description>
        {formatMessage({
          defaultMessage: '支持所有原生 `a` 标签的 `props`; ',
        })}
      </Description>

      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-link--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '禁用 Link' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '如果设置了 `disabled` 或 `loading`, 根组件会替换成 `span` 标签',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-link--disabled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '加载中' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '如果设置了 `disabled` 或 `loading`, 根组件会替换成 `span` 标签',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-link--loading" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '带有 Prefix Icon（图标）的 Link' })}</Subheading>
      <Canvas>
        <Story id="upgraded-link--prefix" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义渲染根组件' })}</Subheading>
      <Description>{formatMessage({ defaultMessage: '可以通过 `component` 属性自定义根组件。' })}</Description>
      <Description>
        {formatMessage({
          defaultMessage: '比如可以传 ReactRoute Link 组件给 `component` 属性，实现第三方路由库集成。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-link--root" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Link} />
    </>
  );
}
