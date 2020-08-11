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
        placeholder="input content"
        value={inputValue}
        onChange={setInputValue}
        label="Normal"
        wrapStyle={{ marginBottom: '20px' }}
        max={10}
        min={0}
      />

      <Input.InputNumber
        placeholder="input content"
        value={inputValue2}
        onChange={setInputValue2}
        label="Disabled"
        disabled={true}
        wrapStyle={{ marginBottom: '20px' }}
      />

      <Input.InputNumber
        placeholder="have error"
        value={inputValue3}
        onChange={setInputValue3}
        label="Error"
        errorMsg="Error Message"
        wrapStyle={{ marginBottom: '30px' }}
      />

      <Input.InputNumber
        placeholder="input content without label."
        value={inputValue4}
        onChange={setInputValue4}
      />
    </div>
  );
};
