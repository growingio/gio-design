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

      <Subheading>{formatMessage({ defaultMessage: '默认样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-pagination--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '基础分页' })}</Subheading>
      <Canvas>
        <Story id="upgraded-pagination--basic" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '首尾跳转按钮' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '`hideFirstButton`首页跳转按钮，`hideLastButton`尾页跳转按钮' })}
      </Description>
      <Canvas>
        <Story id="upgraded-pagination--first-last-buttons" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '当只有一页时隐藏分页器' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '`hideOnSinglePage`参数设置为true时，只有一页时会隐藏分页器' })}
      </Description>
      <Canvas>
        <Story id="upgraded-pagination--hide-on-single-page" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'onChange事件' })}</Subheading>
      <Description>{formatMessage({ defaultMessage: '`onChange`当前页改变时，触发' })}</Description>
      <Canvas>
        <Story id="upgraded-pagination--on-change" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '每页大小' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '您可以设置页码大小，并且支持受控和非受控两种模式。' })}
      </Description>
      <Canvas>
        <Story id="upgraded-pagination--page-size" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '快速跳转参数' })}</Subheading>
      <Description>{formatMessage({ defaultMessage: '`showQuickJumper`参数可以开启是否启用快速跳转' })}</Description>
      <Canvas>
        <Story id="upgraded-pagination--show-quick-jumper" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '显示每页展示页数设置' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`showSizeChanger`参数展示每页展示的页数，一般搭配`pageSizeOptions`参数一起使用',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-pagination--show-size-changer" />
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
