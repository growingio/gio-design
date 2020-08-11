import React, { useState } from 'react';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/button/style/css.js';
import { PlusCircleFilled, FilterOutlined } from '@gio-design/icons';
import './index.less';

export default () => {
  const [loadings, setLoadings] = useState<boolean[]>([false, false]);
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
          <Button type="text">文本按钮</Button>
        </div>
        <div className="item">
          <Button type="text" disabled={true}>
            禁用
          </Button>
        </div>
        <div className="item">
          <Button type="text" loading={true}>
            加载中
          </Button>
        </div>
        <div className="item">
          <Button type="text" loading={loadings[1]} onClick={() => enterLoading(1)}>
            点击!
          </Button>
        </div>
        <div className="item">
          <Button icon={<PlusCircleFilled />} type="text">
            新建
          </Button>
        </div>
      </div>
      <div className="list" style={{ backgroundColor: '#313E75' }}>
        <div className="item">
          <Button ghost={true} type="text">
            深色背景
          </Button>
        </div>
        <div className="item">
          <Button type="text" disabled={true} ghost={true}>
            禁用
          </Button>
        </div>
        <div className="item">
          <Button type="text" loading={true} ghost={true}>
            加载中
          </Button>
        </div>
        <div className="item">
          <Button type="text" loading={loadings[2]} ghost={true} onClick={() => enterLoading(2)}>
            点击!
          </Button>
        </div>
        <div className="item">
          <Button icon={<PlusCircleFilled />} type="text" ghost={true}>
            新建
          </Button>
        </div>
      </div>
    </div>
  );
};
