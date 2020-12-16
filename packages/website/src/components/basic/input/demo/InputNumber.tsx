import * as React from 'react';
import { Input } from '@gio-design/components';
import '@gio-design/components/es/components/input/style/index.css';

export default () => {
  const [inputValue, setInputValue] = React.useState('0');
  const [inputValue2, setInputValue2] = React.useState('0');
  const [inputValue3, setInputValue3] = React.useState('0');

  return (
    <div>
      <Input.InputNumber
        placeholder="请输入…"
        value={inputValue}
        onChange={setInputValue}
        size="small"
        style={{ marginBottom: '20px', display: 'block', width: 300 }}
        max={10}
        min={3}
      />

      <Input.InputNumber
        placeholder="请输入…"
        value={inputValue2}
        onChange={setInputValue2}
        disabled
        style={{ marginBottom: '20px', display: 'block', width: 300 }}
      />

      <Input.InputNumber value={inputValue3} onChange={setInputValue3} size="large" style={{ width: 300 }} />
    </div>
  );
};
