import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Pagination from '../index';

export default function PaginationPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Pagination 分页' })}</Title>

      <Description>
        {formatMessage({
          defaultMessage: '在大量的信息中，采用分页控制单页内的信息数量，也可进行页面跳转。',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4070%3A36365"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '基础分页' })}</Subheading>
      <Canvas>
        <Story id="upgraded-pagination--basic" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '按钮' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '您可以有选择的启用首尾页的按钮，或者启用页码跳转器。' })}
      </Description>
      <Canvas>
        <Story id="upgraded-pagination--buttons" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '每页大小' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '您可以设置页码大小，并且支持受控和非受控两种模式。' })}
      </Description>
      <Canvas>
        <Story id="upgraded-pagination--page-size" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '可控制的分页' })}</Subheading>
      <Canvas>
        <Story id="upgraded-pagination--controlled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '文本渲染器' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '传入 `totalTextRender` 属性，可以自定义渲染文本。' })}
      </Description>
      <Canvas>
        <Story id="upgraded-pagination--total-text-renderer" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Pagination} />
    </>
  );
}
