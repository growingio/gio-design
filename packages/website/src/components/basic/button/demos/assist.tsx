import React, { useState } from 'react';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/button/style/css.js';
import { FilterOutlined } from '@gio-design/icons';
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
          <Button type="assist" size="large">
            辅助按钮
          </Button>
        </div>
        <div className="item">
          <Button type="assist" size="large" disabled>
            禁用
          </Button>
        </div>
        <div className="item">
          <Button type="assist" size="large" loading>
            加载中
          </Button>
        </div>
        <div className="item">
          <Button type="assist" size="large" loading={loadings[1]} onClick={() => enterLoading(1)}>
            点击!
          </Button>
        </div>
        <div className="item">
          <Button icon={<FilterOutlined />} size="large" type="assist">
            过滤条件
          </Button>
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button type="assist">辅助按钮</Button>
        </div>
        <div className="item">
          <Button type="assist" disabled>
            禁用
          </Button>
        </div>
        <div className="item">
          <Button type="assist" loading>
            加载中
          </Button>
        </div>
        <div className="item">
          <Button type="assist" loading={loadings[2]} onClick={() => enterLoading(2)}>
            点击!
          </Button>
        </div>
        <div className="item">
          <Button icon={<FilterOutlined />} type="assist">
            过滤条件
          </Button>
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button type="assist" size="small">
            辅助按钮
          </Button>
        </div>
        <div className="item">
          <Button type="assist" size="small" disabled>
            禁用
          </Button>
        </div>
        <div className="item">
          <Button type="assist" size="small" loading>
            加载中
          </Button>
        </div>
        <div className="item">
          <Button type="assist" size="small" loading={loadings[3]} onClick={() => enterLoading(3)}>
            点击!
          </Button>
        </div>
        <div className="item">
          <Button icon={<FilterOutlined />} size="small" type="assist">
            过滤条件
          </Button>
        </div>
      </div>
    </div>
  );
};
