import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';

import { useIntl } from 'react-intl';
import Link from '../index';

export default function ButtonPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Link 链接' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            '可以通过它的 href 属性创建通向其他网页、文件、同一页面内的位置、电子邮件地址或任何其他 URL 的超链接。',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/J2wZWEocPEb1DbDEj99AgD/Design-System?node-id=21%3A11028">Figma</a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li> 支持所有原生html属性</li>
        <li> 参数 icon 更改为 参数 prefix</li>
        <li> 原 icon 现在需要在prefix内传入如&lt;PlusOutlined/&gt;</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-link--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-link--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'disable' })}</Subheading>
      <Canvas>
        <Story id="upgraded-link--disable" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'loading' })}</Subheading>
      <Canvas>
        <Story id="upgraded-link--loading" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'IconLink' })}</Subheading>
      <Canvas>
        <Story id="upgraded-link--icon-link" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Link} />
    </>
  );
}
