import React, { useState } from 'react';
import { Skeleton, Button } from '@gio-design/components';
import '@gio-design/components/es/components/skeleton/style/index.css';

export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Skeleton loading={loading} delay={1000} />
      <Button
        onClick={() => {
          setLoading(!loading);
        }}
      >
        click
      </Button>
    </>
  );
};
