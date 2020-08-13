import * as React from 'react';
import { Input } from '@gio-design/components';
import '@gio-design/components/es/components/input/style/index.css';

export default () => {
  const [inputValue, setInputValue] = React.useState('');
  const [inputValue2, setInputValue2] = React.useState('');
  const [inputValue3, setInputValue3] = React.useState('333');
  const [inputValue4, setInputValue4] = React.useState('');

  return (
    <div>
      <Input.Password
        placeholder="请输入…"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        label="Normal"
        wrapStyle={{ marginBottom: '20px' }}
      />

      <Input.Password
        placeholder="请输入…"
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
        label="Disabled"
        disabled={true}
        wrapStyle={{ marginBottom: '20px' }}
      />

      <Input.Password
        value={inputValue3}
        onChange={(e) => setInputValue3(e.target.value)}
        label="Error"
        errorMsg="错误提示信息"
        disabled={true}
        wrapStyle={{ marginBottom: '30px' }}
      />

      <Input.Password
        placeholder="这是一个没有label的Input"
        value={inputValue4}
        onChange={(e) => setInputValue4(e.target.value)}
      />
    </div>
  );
};
