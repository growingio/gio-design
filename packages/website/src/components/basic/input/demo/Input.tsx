import * as React from 'react';
import { Input } from '@gio-design/components';
import '@gio-design/components/es/components/input/style/index.css';

export default () => {
  const [inputValue, setInputValue] = React.useState<any | undefined>();
  const [inputValue1, setInputValue1] = React.useState('');
  const [inputValue2, setInputValue2] = React.useState('');
  const [inputValue3, setInputValue3] = React.useState('333');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue1(e.target.value);
  };
  const onChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2(e.target.value);
  };
  const onChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue3(e.target.value);
  };

  return (
    <div>
      <Input
        placeholder="请输入…"
        size="small"
        value={inputValue}
        onChange={onChange}
        maxLength={10}
        style={{ display: 'block', marginBottom: '20px', width: 300 }}
      />

      <Input
        placeholder="请输入…"
        prefix={<span>http://</span>}
        prefixWidth={60}
        value={inputValue1}
        onChange={onChange1}
        style={{ display: 'block', marginBottom: '20px', width: 300 }}
      />

      <Input
        placeholder="禁止输入"
        value={inputValue2}
        onChange={onChange2}
        disabled
        style={{ display: 'block', marginBottom: '20px', width: 300 }}
      />

      <Input value={inputValue3} size="large" onChange={onChange3} style={{ display: 'block', width: 300 }} />
    </div>
  );
};
