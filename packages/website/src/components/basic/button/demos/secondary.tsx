import React, { useState } from 'react';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/button/style/css.js';
import { PlusCircleFilled, FilterOutlined } from '@gio-design/icons';
import Icon from '@gio-design/icon';
import './index.less';

export default () => {
  const [loadings, setLoadings] = useState<boolean[]>([false, false, false, false]);
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
          <Button type="secondary" size="large">
            次要按钮
          </Button>
        </div>
        <div className="item">
          <Button type="secondary" disabled={true} size="large">
            禁用
          </Button>
        </div>
        <div className="item">
          <Button type="secondary" size="small" loading={true}>
            加载中
          </Button>
        </div>
        <div className="item">
          <Button type="secondary" size="small" loading={loadings[1]} onClick={() => enterLoading(1)}>
            点击!
          </Button>
        </div>
        <div className="item">
          <Button icon={<PlusCircleFilled />} size="small" type="secondary">
            新建
          </Button>
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button type="secondary">次要按钮</Button>
        </div>
        <div className="item">
          <Button type="secondary" disabled={true}>
            禁用
          </Button>
        </div>
        <div className="item">
          <Button type="secondary" size="small" loading={true}>
            加载中
          </Button>
        </div>
        <div className="item">
          <Button type="secondary" size="small" loading={loadings[2]} onClick={() => enterLoading(2)}>
            点击!
          </Button>
        </div>
        <div className="item">
          <Button icon={<PlusCircleFilled />} size="small" type="secondary">
            新建
          </Button>
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button type="secondary" size="small">
            次要按钮
          </Button>
        </div>
        <div className="item">
          <Button type="secondary" disabled={true} size="small">
            禁用
          </Button>
        </div>
        <div className="item">
          <Button type="secondary" size="small" loading={true}>
            加载中
          </Button>
        </div>
        <div className="item">
          <Button type="secondary" size="small" loading={loadings[3]} onClick={() => enterLoading(3)}>
            点击!
          </Button>
        </div>
        <div className="item">
          <Button icon={<PlusCircleFilled />} size="small" type="secondary">
            新建
          </Button>
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button type="secondary" icon={<FilterOutlined />} />
        </div>
        <div className="item">
          <Button type="secondary" disabled={true} icon={<FilterOutlined />} />
        </div>
        <div className="item">
          <Button type="secondary" icon={<FilterOutlined />} loading={loadings[4]} onClick={() => enterLoading(4)} />
        </div>
      </div>
    </div>
  );
};
