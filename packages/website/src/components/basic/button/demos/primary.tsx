import React, { useState } from 'react';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/button/style/css.js';
import Icon from '@gio-design/icon';
import './index.less';

export default () => {
  const [loadings, setLoadings] = useState<boolean[]>([false, false, false]);
  const enterLoading = (index: number) => {
    setLoadings((loadings: boolean[]): boolean[] => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((loadings: boolean[]): boolean[] => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 2000);
  };

  return (
    <div className="button-demo">
      <div className="list">
        <div className="item">
          <Button type="primary" size="large">
            Primary
          </Button>
        </div>
        <div className="item">
          <Button type="primary" size="large" disabled={true}>
            Disabled
          </Button>
        </div>
        <div className="item">
          <Button type="primary" size="large" loading={true}>
            Loading
          </Button>
        </div>
        <div className="item">
          <Button
            type="primary"
            size="large"
            loading={loadings[1]}
            onClick={() => enterLoading(1)}
          >
            Click me!
          </Button>
        </div>
        <div className="item">
          <Button
            icon={<Icon type="plus-circle" />}
            size="large"
            type="primary"
          >
            新建
          </Button>
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button type="primary">Primary</Button>
        </div>
        <div className="item">
          <Button type="primary" disabled={true}>
            Disabled
          </Button>
        </div>
        <div className="item">
          <Button type="primary" loading={true}>
            Loading
          </Button>
        </div>
        <div className="item">
          <Button
            type="primary"
            loading={loadings[0]}
            onClick={() => enterLoading(0)}
          >
            Click me!
          </Button>
        </div>
        <div className="item">
          <Button icon={<Icon type="plus-circle" />} type="primary">
            新建
          </Button>
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button type="primary" size="small">
            Primary
          </Button>
        </div>
        <div className="item">
          <Button type="primary" size="small" disabled={true}>
            Disabled
          </Button>
        </div>
        <div className="item">
          <Button type="primary" size="small" loading={true}>
            Loading
          </Button>
        </div>
        <div className="item">
          <Button
            type="primary"
            size="small"
            loading={loadings[2]}
            onClick={() => enterLoading(2)}
          >
            Click me!
          </Button>
        </div>
        <div className="item">
          <Button
            icon={<Icon type="plus-circle" />}
            size="small"
            type="primary"
          >
            新建
          </Button>
        </div>
      </div>
    </div>
  );
};
