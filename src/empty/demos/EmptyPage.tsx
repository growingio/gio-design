import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Empty from '../Empty';

export default function EmptyPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Empty 空态' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            '空状态时的展示占位图。当目前没有数据时，用于显式的用户提示。大尺寸样式，文字最大宽度为300px。小尺寸样式，文字最大宽度为150px。内容超长时，换行。',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A47838">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>将empty图移入到了image的内部，新增了no-find</li>
        <li>从过去的large smalll变成了normal small</li>
        <li>新的image参数为 image?: no-data | no-result | no-find |empty| React.ReactNode;</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-empty--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '看板空态 - 未添加看板' })}</Subheading>
      <Canvas>
        <Story id="upgraded-empty--empty-demo" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '未创建资源空态（通用） - 资源为空' })}</Subheading>
      <Canvas>
        <Story id="upgraded-empty--no-data" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '搜索无结果' })}</Subheading>
      <Canvas>
        <Story id="upgraded-empty--no-result" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '当前查询条件下暂无数据' })}</Subheading>
      <Canvas>
        <Story id="upgraded-empty--no-find" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Empty} />
    </>
  );
}
