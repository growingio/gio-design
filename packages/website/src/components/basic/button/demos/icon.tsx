import React, { useState } from 'react';
import Button from '@gio-design/components/es/components/button';
import '@gio-design/components/es/components/button/style/css.js';
import { FilterOutlined } from '@gio-design/icons';
import './index.less';

export default () => {
  const [loadings, setLoadings] = useState<boolean[]>([false, false, false, false, false, false]);
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
          <Button type="assist" icon={<FilterOutlined />} size="large" />
          <Button type="secondary" icon={<FilterOutlined />} size="large" />
        </div>
        <div className="item">
          <Button type="assist" disabled icon={<FilterOutlined />} size="large" />
          <Button type="secondary" disabled icon={<FilterOutlined />} size="large" />
        </div>
        <div className="item">
          <Button type="assist" disabled icon={<FilterOutlined />} size="large" loading />
          <Button type="secondary" disabled icon={<FilterOutlined />} size="large" loading />
        </div>
        <div className="item">
          <Button
            type="assist"
            icon={<FilterOutlined />}
            size="large"
            loading={loadings[1]}
            onClick={() => enterLoading(1)}
          />
          <Button
            type="secondary"
            icon={<FilterOutlined />}
            size="large"
            loading={loadings[2]}
            onClick={() => enterLoading(2)}
          />
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button type="assist" icon={<FilterOutlined />} />
          <Button type="secondary" icon={<FilterOutlined />} />
        </div>
        <div className="item">
          <Button type="assist" disabled icon={<FilterOutlined />} />
          <Button type="secondary" disabled icon={<FilterOutlined />} />
        </div>
        <div className="item">
          <Button type="assist" disabled icon={<FilterOutlined />} loading />
          <Button type="secondary" disabled icon={<FilterOutlined />} loading />
        </div>
        <div className="item">
          <Button type="assist" icon={<FilterOutlined />} loading={loadings[3]} onClick={() => enterLoading(3)} />
          <Button type="secondary" icon={<FilterOutlined />} loading={loadings[4]} onClick={() => enterLoading(4)} />
        </div>
      </div>
      <div className="list">
        <div className="item">
          <Button type="assist" icon={<FilterOutlined />} size="small" />
          <Button type="secondary" icon={<FilterOutlined />} size="small" />
        </div>
        <div className="item">
          <Button type="assist" disabled icon={<FilterOutlined />} size="small" />
          <Button type="secondary" disabled icon={<FilterOutlined />} size="small" />
        </div>
        <div className="item">
          <Button type="assist" disabled icon={<FilterOutlined />} size="small" loading />
          <Button type="secondary" disabled icon={<FilterOutlined />} size="small" loading />
        </div>
        <div className="item">
          <Button
            type="assist"
            icon={<FilterOutlined />}
            size="small"
            loading={loadings[5]}
            onClick={() => enterLoading(5)}
          />
          <Button
            type="secondary"
            icon={<FilterOutlined />}
            size="small"
            loading={loadings[6]}
            onClick={() => enterLoading(6)}
          />
        </div>
      </div>

      <div className="list">
        <div className="item">
          <Button type="assist" icon={<FilterOutlined />} mini />
          <Button type="secondary" icon={<FilterOutlined />} mini />
        </div>
        <div className="item">
          <Button type="assist" disabled icon={<FilterOutlined />} mini />
          <Button type="secondary" disabled icon={<FilterOutlined />} mini />
        </div>
        <div className="item">
          <Button type="assist" disabled icon={<FilterOutlined />} mini loading />
          <Button type="secondary" disabled icon={<FilterOutlined />} mini loading />
        </div>
        <div className="item">
          <Button type="assist" icon={<FilterOutlined />} loading={loadings[5]} mini onClick={() => enterLoading(5)} />
          <Button
            type="secondary"
            icon={<FilterOutlined />}
            loading={loadings[6]}
            mini
            onClick={() => enterLoading(6)}
          />
        </div>
      </div>
    </div>
  );
};
