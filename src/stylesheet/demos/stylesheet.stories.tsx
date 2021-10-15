import React from 'react';
import './style.less';

export const Demo = () => (
  <div>
    <div className="mixin-demo-border">border</div>
    <div className="mixin-demo-elevation">elevation</div>
    <div className="mixin-demo-blue-1">color blue-1</div>
    <div className="mixin-demo-blue-2">color blue-2</div>
    <div className="mixin-demo-blue-3">color blue-3</div>
    <div className="mixin-demo-green-1">color green-1</div>
    <div className="mixin-demo-green-2">color green-2</div>
    <div className="mixin-demo-green-3">color green-3</div>
  </div>
);

export default {
  title: 'stylesheet/less-variables',
  component: Demo,
};
