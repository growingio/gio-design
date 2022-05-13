import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import { useIntl } from 'react-intl';
import Sign from '../Sign';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Sign 标记' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '图标右上角的圆形徽标数字。',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4092%3A41172"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本参数' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`count`参数为10，`magnitude`为100',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-sign--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'count数值' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`count`参数控制徽标数值',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-sign--count" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'magnitude为最大值，超过显示+' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`magnitude`参数设置count最大值，超出显示+',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-sign--magnitude" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'offset参数设置徽标偏移位置' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`offset`参数控制偏移量，值为[number,number],0位控制上下，1位控制左右',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-sign--offset" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '基本参数' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`visible`参数为展示开关',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-sign--visible" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '基本参数' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`placement`参数控制徽标显示位置，共8种。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-sign--placement" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Sign} />
    </>
  );
}
