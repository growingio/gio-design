import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { FormattedMessage, useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Page from '../Page';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Page Result 页面结果' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '用于反馈一系列操作任务的处理结果',
        })}
      </Description>
      <Subtitle>
        <FormattedMessage defaultMessage="使用场景" />
      </Subtitle>
      <Description>
        {formatMessage({
          defaultMessage: '当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。',
        })}
      </Description>
      <Subtitle>
        <FormattedMessage defaultMessage="设计稿" />
      </Subtitle>
      <Figma
        height="30%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4093%3A45839"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-page--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '无权限' })}</Subheading>
      <Canvas>
        <Story id="upgraded-page--no-auth" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '无资源权限' })}</Subheading>
      <Canvas>
        <Story id="upgraded-page--no-resource" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '无共享' })}</Subheading>
      <Canvas>
        <Story id="upgraded-page--no-shared" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '404 此页面未找到' })}</Subheading>
      <Canvas>
        <Story id="upgraded-page--not-found" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '500 服务器发生了错误' })}</Subheading>
      <Canvas>
        <Story id="upgraded-page--internal-server-error" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Page} />
    </>
  );
}
