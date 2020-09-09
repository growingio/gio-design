import React from 'react';
import { Table, Avatar, AvatarGroup, Tag } from '@gio-design/components';
import Sign from '@gio-design/components/es/components/sign';
import Toggles from '@gio-design/components/es/components/toggles';
import { AndroidFilled, IosFilled, DesktopFilled, MiniProgramFilled } from '@gio-design/icons';
import '@gio-design/components/es/components/table/style/index.css';
import { cloneDeep, concat } from 'lodash';
const dataSource = [
  {
    key: '1',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
    fourth: true,
  },
  {
    key: '2',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
    fourth: false,
  },
];

const columns: any[] = [
  {
    title: '列标题',
    dataIndex: 'first',
    align: 'left',
  },
  {
    title: '列标题',
    dataIndex: 'second',
    align: 'left',
  },
  {
    title: '列标题',
    dataIndex: 'third',
    align: 'left',
  },
];

export default () => {
  const firstColumns = concat(columns, {
    title: '状态',
    dataIndex: 'fourth',
    align: 'left',
    render: (text: boolean) => {
      if (text) {
        return (
          <Sign variant="dot" status="normal" placement="left">
            <span style={{ padding: '0 12px' }}>正常</span>
          </Sign>
        );
      }
      return (
        <Sign variant="dot" status="error" placement="left">
          <span style={{ padding: '0 12px' }}>错误</span>
        </Sign>
      );
    },
  });

  const secondColumns = concat(columns, {
    title: '平台',
    dataIndex: 'fourth',
    align: 'left',
    render: (text: boolean) => {
      if (text) {
        return <IosFilled />;
      }
      return (
        <>
          <MiniProgramFilled />
          <AndroidFilled style={{ margin: '0 12px' }} />
          <DesktopFilled />
        </>
      );
    },
  });

  const thirdColumns = concat(columns, {
    title: '头像',
    dataIndex: 'fourth',
    align: 'left',
    render: (text: boolean) => {
      if (text) {
        return <Avatar>L</Avatar>;
      }
      return <AvatarGroup users={Array(7).fill({ name: 'L' })} />;
    },
  });

  const fourthColumns = concat(columns, {
    title: '状态',
    dataIndex: 'fourth',
    align: 'left',
    render: (text: boolean) => {
      if (text) {
        return <Toggles suffixContent defaultChecked={true} />;
      }
      return <Toggles suffixContent defaultChecked={false} />;
    },
  });

  const fifthColumns = concat(columns, {
    title: '标签',
    dataIndex: 'fourth',
    align: 'left',
    render: (text: boolean) => {
      if (text) {
        return <Tag size="small">标签1</Tag>;
      }
      return (
        <>
          <Tag size="small">标签1</Tag>
          <Tag size="small" style={{ marginLeft: '12px' }}>
            标签2
          </Tag>
          <Tag size="small" style={{ marginLeft: '12px' }}>
            标签3
          </Tag>
          <Tag size="small" style={{ marginLeft: '12px' }}>
            ...
          </Tag>
        </>
      );
    },
  });

  const sixthColumns = concat(cloneDeep(columns), {
    title: '列标题',
    dataIndex: 'fourth',
    align: 'left',
    render: () => '列表文本',
  });

  sixthColumns[0].render = (text: string, record: any, index: number) => {
    if (index === 0) {
      return (
        <>
          {text}
          <Tag status="success" size="small" style={{ marginLeft: '12px' }}>
            已上线
          </Tag>
        </>
      );
    }
    return (
      <>
        {text}
        <Tag status="warning" size="small" style={{ marginLeft: '12px' }}>
          暂停
        </Tag>
      </>
    );
  };
  return (
    <>
      <Table title="列表表头-类别型-左对齐" dataSource={dataSource} columns={firstColumns} pagination={false} />
      <Table dataSource={dataSource} columns={secondColumns} pagination={false} />
      <Table dataSource={dataSource} columns={thirdColumns} pagination={false} />
      <Table dataSource={dataSource} columns={fourthColumns} pagination={false} />
      <Table dataSource={dataSource} columns={fifthColumns} pagination={false} />
      <Table dataSource={dataSource} columns={sixthColumns} pagination={false} />
    </>
  );
};
