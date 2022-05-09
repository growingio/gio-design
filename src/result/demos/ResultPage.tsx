import { useIntl } from "react-intl";
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import React from "react";
import Result from '..';

export default function ResultPage() {
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
        {formatMessage({
          defaultMessage: '使用场景',
        })}
      </Subtitle>
      <Description>
        {formatMessage({
          defaultMessage: '当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。',
        })}
      </Description>
      <Subtitle>
        {formatMessage({
          defaultMessage: '设计稿',
        })}
      </Subtitle>
      <Figma
        height="30%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4093%3A45839"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '404' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '此页面未找到。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-result--not-found" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '403' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '没有此页面的访问权限',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-result--unauthorized" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Result} />
    </>
  );
}