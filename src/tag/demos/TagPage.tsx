import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Tag from '../Tag';

export default function EmptyPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Tag 标签' })}</Title>
      <p>{formatMessage({ defaultMessage: '进行标记和分类的标签，作为已选内容的标签。' })}</p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基础标记 样式' })}</Subheading>
      <p className="">
        {formatMessage({
          defaultMessage: '1、用于常规的标记。如：「智能运营-活动管理」等。字体12px-Medium，高度20px。',
        })}
      </p>
      <p className="">
        {formatMessage({
          defaultMessage:
            '2、当状态信息需要特别显示出来时，应当使用带底色的标签标示。如：「数据中心-数据校验」等。字体14px-Regular，高度24px。',
        })}
      </p>
      <p className="">
        {formatMessage({ defaultMessage: '3、一般用于导航上，用于标示功能的版本信息。字体12px-Medium，高度20px。' })}
      </p>
      <Canvas>
        <Story id="components-tag--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '已选内容以标签的方式展现 样式' })}</Subheading>
      <p className="">
        {formatMessage({
          defaultMessage:
            '1、过滤条件：页面内的过滤条件高度固定为32px；控件内的过滤条件高度固定为24px。字体均为14px-Regular。',
        })}
      </p>
      <p className="">
        {formatMessage({
          defaultMessage:
            '2、可删除的标签：可直接展示“X”删除按钮，也可hover时才出现删除按钮，二者可配置。如：「数据中心-业务标签」。',
        })}
      </p>
      <p className="">
        {formatMessage({
          defaultMessage: '3、灰色背景色时，可以选用蓝色的Tag样式。如：「新建用户分群-添加筛选条件」。',
        })}
      </p>
      <Canvas>
        <Story id="components-tag--closable" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Tag} />
    </>
  );
}
