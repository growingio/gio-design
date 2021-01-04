import * as React from 'react';
import { Input } from '@gio-design/components';
import '@gio-design/components/es/components/input/style/index.css';

export default () => {
  const [inputValue, setInputValue] = React.useState<number>();
  return (
    <div>
      <Input.InputNumber
        value={inputValue}
        onChange={setInputValue}
        size="large"
        style={{ marginBottom: '20px', display: 'flex', width: 300 }}
        customDisplay={{
          formatter: (value: number) => `${value}%`,
          parser: (str: string) => Number(str.replace('%', '')),
        }}
      />
    </div>
  );
};
