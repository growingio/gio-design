import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/blocks';
import Tabs from '../Tabs';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Tabs 标签页' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '选项卡切换组件。',
        })}
      </Description>
      <Subtitle>
        {formatMessage({
          defaultMessage: '使用场景',
        })}
      </Subtitle>
      <Description>
        {formatMessage({
          defaultMessage: '标签栏使您能够通过单个对象结构关联多个导航端点，tab 用于切换下方的内容',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage: 'Tabs 和 Switch 的区别在于，Tabs 是切换下方内容控制内容联动，多用于导航，Switch 只是切换选项，并不能控制内容联动。 ',
        })}
      </Description>

      <Subtitle>
        {formatMessage({
          defaultMessage: '设计稿',
        })}
      </Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=6826%3A77724"
      />
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '基本' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: 'Tabs 默认选中第一项。 Switch 的区别在于，Tabs 是切换下方内容控制内容联动，多用于导航，Switch 只是切换选项，并不能控制内容联动。 ',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tabs--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'no-tab' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tabs--no-tab" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'no-prefix' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tabs--no-prefix" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'have-children' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tabs--have-children" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Tabs} />
    </>
  );
}
