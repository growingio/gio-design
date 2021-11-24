import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Popover from '../index';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Popover 气泡确认框' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            '点击元素，弹出气泡式的确认框。目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。',
        })}
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式：无变化。</li>
        <li>api变化：内容由content包裹，去除了footer，组件用到了react-popper</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: 'controlled' })}</Subheading>
      <Canvas>
        <Story id="upgraded-popover--controlled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'default-visible' })}</Subheading>
      <Canvas>
        <Story id="upgraded-popover--default-visible" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'disabled' })}</Subheading>
      <Canvas>
        <Story id="upgraded-popover--disabled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'enterable' })}</Subheading>

      <Canvas>
        <Story id="upgraded-popover--enterable" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'not-support-ref' })}</Subheading>
      <Canvas>
        <Story id="upgraded-popover--not-support-ref" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'placement' })}</Subheading>
      <Canvas>
        <Story id="upgraded-popover--placement" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'portal' })}</Subheading>
      <Canvas>
        <Story id="upgraded-popover--portal" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'support-ref' })}</Subheading>
      <Canvas>
        <Story id="upgraded-popover--support-ref" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'trigger' })}</Subheading>
      <Canvas>
        <Story id="upgraded-popover--trigger" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Popover} />
    </>
  );
}
