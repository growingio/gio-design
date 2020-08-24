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
        value={inputValue}
        onChange={setInputValue}
        wrapStyle={{ marginBottom: '20px' }}
      />

      <Input.Password
        placeholder="请输入…"
        value={inputValue2}
        onChange={setInputValue2}
        disabled={true}
        wrapStyle={{ marginBottom: '20px' }}
      />

      <Input.Password value={inputValue3} onChange={setInputValue3} disabled={true} />
    </div>
  );
};
