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
      <Subheading>{formatMessage({ defaultMessage: '410' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '资源被删除',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-result--deleted" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '423' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '资源被锁定 Locked',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-result--locked" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '500' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '服务器错误',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-result--server-error" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '自定义' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '自定义错误页',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-result--error" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: 'Empty State' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: 'empty-chart' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '看板空态 - 未添加看板',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-result--empty-chart" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'empty' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '未创建资源空态（通用） - 资源为空',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-result--empty" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'empty-result' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '搜索无结果',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-result--empty-result" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'empty-data' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '无数据',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-result--empty-data" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Size' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: 'Page 有 `Normal（450px`）、`Small（220px）`两种尺寸；Emtpy State 有` Normal（300px）`、`Small（150px）`两种尺寸',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-result--error-page-small-size" />
        <Story id="upgraded-result--empty-small-size" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Result} />
    </>
  );
}