import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import './style.less';
import '../variables/index.less';
import Docs from './stylesheet.mdx';

export const Demo = () => (
  <div className="box">
    <span> Border :</span>
    <div className="mixin-demo-border">border</div>
    <span> Shadow :</span>
    <div className="mixin-demo-elevation">elevation</div>
    <hr />
    <p> Palette:</p>
    {[...Array(6)].map((item, index) => (
      <div className={`mixin-demo-gray-${index}`}>gray-{index}</div>
    ))}
    {[...Array(3)].map((item, index) => (
      <div className={`mixin-demo-blue-${index + 1}`}>blue-{index + 1}</div>
    ))}
    {[...Array(3)].map((item, index) => (
      <div className={`mixin-demo-green-${index + 1}`}>green-{index + 1}</div>
    ))}
    {[...Array(3)].map((item, index) => (
      <div className={`mixin-demo-yellow-${index + 1}`}>yellow-{index + 1}</div>
    ))}
    {[...Array(3)].map((item, index) => (
      <div className={`mixin-demo-red-${index + 1}`}>red-{index + 1}</div>
    ))}
  </div>
);

export default {
  title: 'stylesheet/less-variables',
  component: Demo,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: Docs,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/J2wZWEocPEb1DbDEj99AgD/Design-System?node-id=2%3A741',
      allowFullscreen: true,
    },
  },
};
