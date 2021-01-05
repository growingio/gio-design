import React, { useState } from 'react';
import { Skeleton, Button } from '@gio-design/components';
import '@gio-design/components/es/components/skeleton/style/index.css';

export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Skeleton.Image loading={loading} delay={1000}>
        <Skeleton avatar />
      </Skeleton.Image>
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
