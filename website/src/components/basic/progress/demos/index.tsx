import React, { useState, useEffect } from 'react';
import { Progress } from '@gio-design/components';
import '@gio-design/components/es/components/progress/style/index.css';

const ProgressDemo = () => {
  const [percent, setPercent] = useState(0);
  const [percentError, setPercentError] = useState(0);
  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (percent < 100) {
      setTimeout(() => {
        setPercent(percent + 10);
      }, 200);
    }
  }, [percent]);

  useEffect(() => {
    if (percentError < 30) {
      setTimeout(() => {
        setPercentError(percentError + 2);
      }, 200);
    } else {
      setStatus('exception');
    }
  }, [percentError]);

  return (
    <>
      <Progress percent={30} />
      <Progress percent={percent} status={percent === 100 ? 'success' : 'active'} />
      <Progress percent={percentError} status={status} />
    </>
  );
};

export default ProgressDemo;
