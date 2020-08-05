import * as React from 'react';
import { Input } from '@gio-design/components';
import '@gio-design/components/es/components/input/style/index.css';

export default () => {
  const [inputValue, setInputValue] = React.useState('');
  const [inputValue2, setInputValue2] = React.useState('');
  const [inputValue3, setInputValue3] = React.useState('');

  return (
    <div>
      <Input.InputHidden
        placeholder="input content"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        wrapStyle={{ marginBottom: '20px' }}
      />

      <Input.InputHidden
        placeholder="Disabled"
        value={inputValue2}
        onChange={e => setInputValue2(e.target.value)}
        disabled={true}
        wrapStyle={{ marginBottom: '20px' }}
      />

      <Input.InputHidden
        placeholder="have error"
        value={inputValue3}
        onChange={e => setInputValue3(e.target.value)}
        errorMsg="Error Message"
      />
    </div>
  );
};
