/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from 'react';
import Table from '@gio-design/components/es/components/table';
import { ColumnType } from '@gio-design/components/es/components/table/interface';
import { Record, TokenProps, TokenTableProps } from './interface';
import { dasherize } from './utils';
import * as GIOTokens from '@gio-design/tokens';
import '@gio-design/components/es/components/table/style/index.css';
import './tokenTable.less';

const columns: ColumnType<Record>[] = [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    render: (text: string) => (
      <>
        <p>
          Less: <code>${dasherize(text)}</code>
        </p>
        <p>
          JavaScript: <code>{text}</code>
        </p>
      </>
    ),
  },
  {
    title: 'Example',
    key: 'example',
    dataIndex: 'value',
    render: (text: string, record: Record) => record.example(text),
  },
  {
    title: 'Value',
    key: 'value',
    dataIndex: 'value',
    render: (text: string) => <code>{text}</code>,
  },
];

const allTokens = GIOTokens as TokenProps;

function TokenTable(props: TokenTableProps) {
  const { prefix, example } = props;
  const paletteTokens: Record[] = Object.keys(allTokens)
    .filter((name: string) => name.startsWith(prefix))
    .map(
      (name: string) =>
        ({
          name,
          example,
          value: allTokens[name],
        } as Record)
    );
  return <Table dataSource={paletteTokens} className="gio-token-table" pagination={false} columns={columns} />;
}

export default TokenTable;
