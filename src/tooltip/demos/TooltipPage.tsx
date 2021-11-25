import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Tooltip from '..';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Tooltip 文字提示' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '简单的文字提示气泡框。鼠标悬停时显示提示，移出即消失，气泡浮层不承载复杂文本和操作。',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A45835">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>包装popover</li>
        <li>去除冗余api</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: 'controlled' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tooltip--controlled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'enterable' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tooltip--enterable" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Multi line' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tooltip--multi-line" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'placement' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tooltip--placement" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'trigger' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tooltip--trigger" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Tooltip} />
    </>
  );
}
