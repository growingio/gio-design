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
          <Button type="text" size="large">
            辅助按钮
          </Button>
        </div>
        <div className="item">
          <Button type="text" size="large" disabled>
            禁用
          </Button>
        </div>
        <div className="item">
          <Button type="text" size="large" loading>
            加载中
          </Button>
        </div>
        <div className="item">
          <Button type="text" size="large" loading={loadings[1]} onClick={() => enterLoading(1)}>
            点击!
          </Button>
        </div>
        <div className="item">
          <Button icon={<FilterOutlined />} size="large" type="text">
            过滤条件
          </Button>
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button type="text">辅助按钮</Button>
        </div>
        <div className="item">
          <Button type="text" disabled>
            禁用
          </Button>
        </div>
        <div className="item">
          <Button type="text" loading>
            加载中
          </Button>
        </div>
        <div className="item">
          <Button type="text" loading={loadings[2]} onClick={() => enterLoading(2)}>
            点击!
          </Button>
        </div>
        <div className="item">
          <Button icon={<FilterOutlined />} type="text">
            过滤条件
          </Button>
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button type="text" size="small">
            辅助按钮
          </Button>
        </div>
        <div className="item">
          <Button type="text" size="small" disabled>
            禁用
          </Button>
        </div>
        <div className="item">
          <Button type="text" size="small" loading>
            加载中
          </Button>
        </div>
        <div className="item">
          <Button type="text" size="small" loading={loadings[3]} onClick={() => enterLoading(3)}>
            点击!
          </Button>
        </div>
        <div className="item">
          <Button icon={<FilterOutlined />} size="small" type="text">
            过滤条件
          </Button>
        </div>
      </div>
    </div>
  );
};
