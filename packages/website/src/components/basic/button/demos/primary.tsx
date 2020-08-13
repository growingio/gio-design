import React, { useState } from 'react';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/button/style/css.js';
import { PlusCircleFilled } from '@gio-design/icons';
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
          <Button size="large">主要按钮</Button>
        </div>
        <div className="item">
          <Button type="primary" icon={<PlusCircleFilled />} size="large" disabled={true}>
            禁用
          </Button>
        </div>
        <div className="item">
          <Button type="primary" size="large" loading={true}>
            加载中
          </Button>
        </div>
        <div className="item">
          <Button type="primary" size="large" loading={loadings[1]} onClick={() => enterLoading(1)}>
            点击!
          </Button>
        </div>
        <div className="item">
          <Button icon={<PlusCircleFilled />} size="large" type="primary">
            新建
          </Button>
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button type="primary">主要按钮</Button>
        </div>
        <div className="item">
          <Button type="primary" disabled={true}>
            禁用
          </Button>
        </div>
        <div className="item">
          <Button type="primary" loading={true}>
            加载中
          </Button>
        </div>
        <div className="item">
          <Button type="primary" loading={loadings[2]} onClick={() => enterLoading(2)}>
            点击!
          </Button>
        </div>
        <div className="item">
          <Button icon={<PlusCircleFilled />} type="primary">
            新建
          </Button>
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button type="primary" size="small">
            主要按钮
          </Button>
        </div>
        <div className="item">
          <Button type="primary" size="small" disabled={true}>
            禁用
          </Button>
        </div>
        <div className="item">
          <Button type="primary" size="small" loading={true}>
            加载中
          </Button>
        </div>
        <div className="item">
          <Button type="primary" size="small" loading={loadings[3]} onClick={() => enterLoading(3)}>
            点击!
          </Button>
        </div>
        <div className="item">
          <Button icon={<PlusCircleFilled />} size="small" type="primary">
            新建
          </Button>
        </div>
      </div>
    </div>
  );
};
