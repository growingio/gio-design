import * as React from 'react';
import { Input } from '@gio-design/components';
import '@gio-design/components/es/components/input/style/index.css';

export default () => {
  const [inputValue, setInputValue] = React.useState('');
  const [inputValue2, setInputValue2] = React.useState('');
  const [inputValue3, setInputValue3] = React.useState('333');

  return (
    <div>
      <Input
        placeholder="请输入…"
        size="small"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        wrapStyle={{ display: 'block', marginBottom: '20px' }}
      />

      <Input
        placeholder="禁止输入"
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
        disabled={true}
        wrapStyle={{ display: 'block', marginBottom: '20px' }}
      />

      <Input
        value={inputValue3}
        size="large"
        onChange={(e) => setInputValue3(e.target.value)}
        wrapStyle={{ display: 'block' }}
      />
    </div>
  );
};
