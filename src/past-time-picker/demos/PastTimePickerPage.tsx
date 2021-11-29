import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import PastTimePicker from '..';

export default function DatePickerPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>StaticPastTimePicker 过去时间选择器</Title>
      <Subtitle>用户可以通过选择器，选择相对和绝对日期区间。</Subtitle>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式：无变化。</li>
        <li>api变化：无。</li>
        <li>同pro中的pasttimepicker，包含了Staticpasttimepicker，pro中的select和picker进行了整合。</li>
      </ul>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '样式 - 「常用时间」' })}</Subheading>
      <p>左侧 List 为常用时间和三种时间计算方式，清晰的逻辑帮助用户减少快速理解如何使用该组件。</p>
      <Canvas>
        <Story id="upgraded-pasttimepicker--quick" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '样式 - 「从某日至今」' })}</Subheading>
      <p>
        当用户选择“从某日至今”时，用户可以借助时间选择器选择从某一特定日期至今日的动态区间（今日日期为动态）。由于只有开始日期需要选择，我们让用户通过更改日历来做选出开始日期。
      </p>
      <Canvas>
        <Story id="upgraded-pasttimepicker--since" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '样式 - 「动态时段」' })}</Subheading>
      <p>
        当用户选择“过去 N 天”时，用户可以借助时间选择器选择过去 N 天或者过去 N~M
        天，这样他可以查看（相对今天）过去一段时间范围的数据。我们让用户用过输入数字或更改日历来做出 N 天的选择
      </p>
      <Canvas>
        <Story id="upgraded-pasttimepicker--relative" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '样式 - 「过去固定时段」' })}</Subheading>
      <p>
        当用户选择“过去固定时段”时，用户可以借助时间选择器选择日期区间的开始日期和结束日期，该日期区间为固定日期区间。
      </p>
      <Canvas>
        <Story id="upgraded-pasttimepicker--absolute" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '实验特性' })}</Subheading>

      <Canvas>
        <Story id="upgraded-pasttimepicker--experiment" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '自定义模式' })}</Subheading>
      <p>“常用时间”必须显示，另外三种模式可配置。</p>
      <Canvas>
        <Story id="upgraded-pasttimepicker--modes" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '禁用日期' })}</Subheading>

      <Canvas>
        <Story id="upgraded-pasttimepicker--disabled-date" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '样式 - 「常用时间」' })}</Subheading>
      <Canvas>
        <Story id="upgraded-pasttimepicker--static-quick" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '样式 - 「从某日至今」' })}</Subheading>

      <Canvas>
        <Story id="upgraded-pasttimepicker--static-since" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '样式 - 「动态时段」' })}</Subheading>

      <Canvas>
        <Story id="upgraded-pasttimepicker--static-relative" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '样式 - 「过去固定时段」' })}</Subheading>

      <Canvas>
        <Story id="upgraded-pasttimepicker--static-absolute" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '实验特性' })}</Subheading>

      <Canvas>
        <Story id="upgraded-pasttimepicker--static-experiment" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '自定义模式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-pasttimepicker--static-modes" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '禁用日期' })}</Subheading>
      <Canvas>
        <Story id="upgraded-pasttimepicker--disabled-date" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={PastTimePicker} />
    </>
  );
}
