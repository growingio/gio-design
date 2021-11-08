export interface ExampleData {
  a: string;
  b: string;
  c: string;
  d: string;
}

export const dataSource1: ExampleData[] = Array.from({ length: 100 }, (_, key) => ({
  a: '表格内容',
  b: '表格内容',
  c: '表格内容',
  d: '表格内容',
  key: key.toString(),
}));

export const dataSource2: ExampleData[] = Array.from({ length: 110 }, (_, key) => ({
  a: '表格内容2',
  b: '表格内容2',
  c: '表格内容2',
  d: '表格内容2',
  key: key.toString(),
}));

export const columns1 = [
  {
    title: '头像',
    dataIndex: 'a',
  },
  {
    title: '列标题',
    dataIndex: 'd',
  },
  {
    title: '列标题',
    dataIndex: 'c',
  },
  {
    title: '列标题',
    dataIndex: 'd',
  },
];

export const columns2 = [
  {
    title: '头像',
    dataIndex: 'a',
  },
  {
    title: '列标题2',
    dataIndex: 'd',
  },
  {
    title: '列标题2',
    dataIndex: 'c',
  },
  {
    title: '列标题2',
    dataIndex: 'd',
  },
];
