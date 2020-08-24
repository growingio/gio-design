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
        onChange={setInputValue}
        resize={false}
        wrapStyle={{ marginBottom: '20px', display: 'block' }}
      />

      <Input.TextArea
        placeholder="禁止输入"
        value={inputValue2}
        onChange={setInputValue2}
        disabled={true}
        resize={true}
        wrapStyle={{ display: 'block' }}
      />
    </div>
  );
};
