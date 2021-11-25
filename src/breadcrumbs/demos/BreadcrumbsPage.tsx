import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Breadcrumbs from '../Breadcrumbs';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Breadcrumbs 面包屑' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '我们一般要求所有页面都有面包屑，弹窗等非页面不需要面包屑。:',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4061%3A35944">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>内部使用link作为按钮，icon来源于link</li>
        <li>样式变化：无</li>
        <li>接口变化：无，</li>
        <li>使用方法有变：从传对象参数变成了JSX直接传，实现方式(nav-&gt;ol-&gt;li)</li>
        <li> &lt;Breadcrumbs&gt;&lt;Link /&gt;&lt;/Breadcrumbs&gt;</li>
      </ul>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-breadcrumbs--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-breadcrumbs--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'icon' })}</Subheading>
      <Canvas>
        <Story id="upgraded-breadcrumbs--icon-breadcrumb" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '自定义连接符' })}</Subheading>
      <Canvas>
        <Story id="upgraded-breadcrumbs--custom-separator" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Breadcrumbs} />
    </>
  );
}
