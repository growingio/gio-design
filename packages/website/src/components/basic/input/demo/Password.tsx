import * as React from 'react';
import { Input } from '@gio-design/components';
import '@gio-design/components/es/components/input/style/index.css';

export default () => {
  const [inputValue, setInputValue] = React.useState('');
  const [inputValue2, setInputValue2] = React.useState('');
  const [inputValue3, setInputValue3] = React.useState('333');

  return (
    <div>
      <Input.Password
        placeholder="请输入…"
        size="small"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ marginBottom: '20px', display: 'flex', width: 300 }}
      />

      <Input.Password
        placeholder="请输入…"
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
        disabled
        style={{ marginBottom: '20px', display: 'flex', width: 300 }}
      />

      <Input.Password
        value={inputValue3}
        onChange={(e) => setInputValue3(e.target.value)}
        disabled
        size="large"
        style={{ width: 300 }}
      />
    </div>
  );
};
