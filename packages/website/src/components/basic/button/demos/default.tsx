import React, { useState } from 'react';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/button/style/css.js';
import Icon from '@gio-design/icon';
import './index.less';

export default () => {
  const [loadings, setLoadings] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
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
          <Button type="default" size="large">
            Assist
          </Button>
        </div>
        <div className="item">
          <Button disabled={true} size="large">
            Disabled
          </Button>
        </div>
        <div className="item">
          <Button loading={true} size="large">
            Loading
          </Button>
        </div>
        <div className="item">
          <Button
            loading={loadings[1]}
            size="large"
            onClick={() => enterLoading(1)}
          >
            Click me!
          </Button>
        </div>
        <div className="item">
          <Button icon={<Icon type="plus-circle" />} size="large">
            新建
          </Button>
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button type="default">Assist</Button>
        </div>
        <div className="item">
          <Button disabled={true}>Disabled</Button>
        </div>
        <div className="item">
          <Button loading={true}>Loading</Button>
        </div>
        <div className="item">
          <Button loading={loadings[0]} onClick={() => enterLoading(0)}>
            Click me!
          </Button>
        </div>
        <div className="item">
          <Button icon={<Icon type="plus-circle" />}>新建</Button>
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button type="default" size="small">
            Assist
          </Button>
        </div>
        <div className="item">
          <Button disabled={true} size="small">
            Disabled
          </Button>
        </div>
        <div className="item">
          <Button loading={true} size="small">
            Loading
          </Button>
        </div>
        <div className="item">
          <Button
            loading={loadings[2]}
            size="small"
            onClick={() => enterLoading(2)}
          >
            Click me!
          </Button>
        </div>
        <div className="item">
          <Button icon={<Icon type="plus-circle" />} size="small">
            新建
          </Button>
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button icon={<Icon type="filter" />} />
        </div>
        <div className="item">
          <Button disabled={true} icon={<Icon type="filter" />} />
        </div>
        <div className="item">
          <Button
            icon={<Icon type="filter" />}
            loading={loadings[3]}
            onClick={() => enterLoading(3)}
          />
        </div>
      </div>
    </div>
  );
};
