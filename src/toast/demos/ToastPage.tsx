import React from 'react';
import { Canvas, Title, Heading, Story, Subheading } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Toast 全局提示' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            '全局展示成功、警告和错误等反馈信息。顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。通常为对于操作成功或失败的状态提示，提示重要性偏低，位置悬浮于页面，默认在操作完成后的一定时间（参数可控）消失。Toast宽度随内容自适应。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '默认' })}</Subheading>
      <Canvas>
        <Story id="components-toast--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '分步骤的 Modal' })}</Subheading>
      <Canvas>
        <Story id="components-toast--next-step" />
      </Canvas>
    </>
  );
}
