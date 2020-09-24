import React from 'react';
import { Select } from '@gio-design/components';
import '@gio-design/components/es/components/select/style/index.css';

const labels = ['全部', '已上线', '待上线', '已下线', '草稿'];
const values = ['all', 'online', 'pending', 'off', 'draft'];

const options = values.map((value, index) => ({
  value,
  label: labels[index],
  groupKey: 'platform',
  groupLabel: '应用平台',
}));

const Basics = (): React.ReactNode => (
  <>
    <Select options={options} searchable width={200} onChange={console.log} />
    <br />
    <Select options={options} multiple searchable width={200} onChange={console.log} />
  </>
);

export default Basics;
