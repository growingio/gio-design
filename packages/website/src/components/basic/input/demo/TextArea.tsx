import * as React from 'react';
import { Input } from '@gio-design/components';
import '@gio-design/components/es/components/input/style/index.css';

export default () => {
  const [inputValue, setInputValue] = React.useState('');
  const [inputValue2, setInputValue2] = React.useState('');

  return (
    <div>
      <Input.TextArea
        placeholder="请输入…"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        resize={false}
        wrapStyle={{ marginBottom: '20px', display: 'block' }}
      />

      <Input.TextArea
        placeholder="禁止输入"
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
        disabled={true}
        resize={true}
        wrapStyle={{ display: 'block' }}
      />
    </div>
  );
};
