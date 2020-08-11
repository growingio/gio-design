import * as React from 'react';
import { Input } from '@gio-design/components';
import '@gio-design/components/es/components/input/style/index.css';

export default () => {
  const [inputValue, setInputValue] = React.useState('');
  const [inputValue2, setInputValue2] = React.useState('');
  const [inputValue3, setInputValue3] = React.useState('');
  const [inputValue4, setInputValue4] = React.useState('');

  return (
    <div>
      <Input.TextArea
        placeholder="input content"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        label="Normal"
        wrapStyle={{ marginBottom: '20px' }}
        inputStyle={{ height: '80px', resize: 'none' }}
      />

      <Input.TextArea
        placeholder="input content"
        value={inputValue2}
        onChange={e => setInputValue2(e.target.value)}
        label="Disabled"
        disabled={true}
        wrapStyle={{ marginBottom: '20px' }}
        inputStyle={{ height: '80px', resize: 'none' }}
      />

      <Input.TextArea
        placeholder="have error"
        value={inputValue3}
        onChange={e => setInputValue3(e.target.value)}
        label="Error"
        errorMsg="Error Message"
        wrapStyle={{ marginBottom: '30px' }}
        inputStyle={{ height: '80px', resize: 'none' }}
      />

      <Input.TextArea
        placeholder="input content without label."
        value={inputValue4}
        onChange={e => setInputValue4(e.target.value)}
        inputStyle={{ height: '80px', resize: 'none' }}
      />
    </div>
  );
};
