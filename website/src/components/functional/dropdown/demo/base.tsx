import React, { useState } from 'react';
import { Dropdown, Button } from '@gio-design/components';
import '@gio-design/components/es/components/dropdown/style/index.css';

export default () => {
  const [v, setV] = useState(false);
  return (
    <Dropdown
      visible={v}
      onVisibleChange={setV}
      overlay={
        <div
          style={{
            width: 294,
            height: 372,
            border: '1px dashed #DCDFED',
            borderRadius: '4px',
            backgroundColor: '#FFFFFF',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          内容区域
        </div>
      }
      placement="bottomRight"
    >
      <Button type="secondary">更多操作</Button>
    </Dropdown>
  );
};
