import React, { useState } from 'react';
import { Select } from '@gio-design/components';
import '@gio-design/components/es/components/select/style/index.css';

const labels = ['全部', '已上线', '待上线', '已下线', '草稿'];
const values = ['all', 'online', 'pending', 'off', 'draft'];

const options = values.map((value, index) => ({
  value,
  label: labels[index],
  groupValue: 'platform',
  groupLabel: '应用平台',
}));

const Basics = (): React.ReactNode => {
  const [state, setstate] = useState(values[0]);
  return (
    <>
      <Select options={options} searchable width={200} onChange={(option: any) => setstate(option.id)} value={state} />
      <br />
      <Select options={options} multiple searchable width={200} onChange={console.log} />
    </>
  );
};

export default Basics;
