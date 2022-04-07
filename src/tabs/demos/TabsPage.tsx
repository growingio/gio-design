import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
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
          defaultMessage:
            'Tabs 和 Switch 的区别在于，Tabs 是切换下方内容控制内容联动，多用于导航，Switch 只是切换选项，并不能控制内容联动。 ',
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
          defaultMessage: 'Tabs 默认选中第一项。Tab.disabled 禁用某一项。 ',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tabs--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '有图标' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: ' 通过Tab.prefix 可以给标签添加图标。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tabs--with-icon" />
        <Story id="upgraded-tabs--icon-only" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '滑动' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '标签项较多时，不会折行，可以左右滑动。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tabs--scroll-overflow" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '大小' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '标签有Normal（36px）、Small（30px）两种尺寸。大号页签用在页头区域，小号用在弹出框等较狭窄的容器内。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tabs--size" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '完全控制' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '通过value属性控制当前选中的标签。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tabs--controlled-value" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Tabs} />
    </>
  );
}
