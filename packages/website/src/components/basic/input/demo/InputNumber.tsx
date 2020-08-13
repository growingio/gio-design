import * as React from 'react';
import { Input } from '@gio-design/components';
import '@gio-design/components/es/components/input/style/index.css';

export default () => {
  const [inputValue, setInputValue] = React.useState(0);
  const [inputValue2, setInputValue2] = React.useState(0);
  const [inputValue3, setInputValue3] = React.useState(0);
  const [inputValue4, setInputValue4] = React.useState(0);

  return (
    <div>
      <Input.InputNumber
        placeholder="请输入…"
        value={inputValue}
        onChange={setInputValue}
        label="Normal"
        wrapStyle={{ marginBottom: '20px' }}
        max={10}
        min={0}
      />

      <Input.InputNumber
        placeholder="请输入…"
        value={inputValue2}
        onChange={setInputValue2}
        label="Disabled"
        disabled={true}
        wrapStyle={{ marginBottom: '20px' }}
      />

      <Input.InputNumber
        value={inputValue3}
        onChange={setInputValue3}
        label="Error"
        errorMsg="错误提示信息"
        wrapStyle={{ marginBottom: '30px' }}
      />

      <Input.InputNumber placeholder="这是一个没有label的Input" value={inputValue4} onChange={setInputValue4} />
    </div>
  );
};
