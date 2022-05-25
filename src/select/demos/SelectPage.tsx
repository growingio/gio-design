import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Select from '../index';
import Alert from '../../alert';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Select' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage:
            '下拉选择器，让用户做出选择。Select 与 Dropdown 的区别是 Select 承载的是选项，Dropdown 的承载的是操作。',
        })}
      </Description>

      <Alert
        style={{ margin: '0 0 38px' }}
        message={
          <Description>
            {formatMessage({
              defaultMessage: '封装自List 组件，List+popover的结合',
            })}
          </Description>
        }
      />
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-select--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'onChange 触发事件' })}</Subheading>
      <Canvas>
        <Story id="upgraded-select--on-change" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'onVisibleChange' })}</Subheading>
      <Canvas>
        <Story id="upgraded-select--on-visible-change" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'autoWidth' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`autoWidth` 属性为true时，下拉框会和触发器相同宽度',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-select--auto-width" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'prefix 和 Suffix' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`prefix suffix` 属性控制item的前后缀',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-select--prefix-and-suffix" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'options 传数据' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以通过options传数组，代替jsx方式传数据',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-select--options" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'value 和 defaultValue 受控模式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '受控模式，外部控制value',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-select--value" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'visible  受控模式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '受控模式，外部控制visible开关',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-select--visible" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'renderTrigger 自定义触发器' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以通过`renderTrigger`自定义触发器,`triggerPrefix`和`triggerSuffix`属性控制trigger的前后缀',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-select--trigger" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'title 自定义回显内容' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以通过`title`属性控制自定义回显内容',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-select--title" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'empty 为空时样式覆盖' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以通过`empty`属性控制列表为空时返回的节点',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-select--empty" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Select} />
    </>
  );
}
