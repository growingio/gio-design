import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Divider from '../Divider';
import { Alert } from '../..';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Divider 分割线' })}</Title>
      <Description>{formatMessage({ defaultMessage: '分隔线是对列表和布局中的内容进行分组的一条细线。' })}</Description>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '列表分割线' })}</Subheading>
      <Canvas>
        <Story id="upgraded-divider--list-divider" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '垂直分割线' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '您也可以使用 `orientation="vertical"` 属性将分割线渲染成垂直形状。' })}
      </Description>

      <Alert
        type="warning"
        message={formatMessage(
          {
            defaultMessage:
              '请注意这其中使用了 <code>flexItem</code> 属性来适应 flex 容器。如果容器设置了 <code>display: flex | inline-flex</code> 布局，需要设置 <code>flexItem</code> 属性，否则不能正确计算分割线的高度。',
          },
          {
            code: (text) => <code>{text}</code>,
          }
        )}
      />
      <Canvas>
        <Story id="upgraded-divider--vertical-divider" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Divider} />
    </>
  );
}
