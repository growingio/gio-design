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
    <span> Scroll-bar :</span>
    <div
      className="scroll-bar"
      style={{
        width: '100%',
        height: '20px',
      }}
    >
      <span
        style={{
          width: '2000px',
          display: 'inline-block',
        }}
      >
        》〉》〉》〉》〉》〉》〉》〉😎 》〉》〉》〉》〉》〉》〉》〉😎 》〉》〉》〉》〉》〉》〉》〉😎
        》〉》〉》〉》〉》〉》〉》〉😎
      </span>
    </div>
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
    <hr />

    {[...Array(5)].map((item, index) => (
      <div className={`text-h${index + 1}`}> 我是text-h{index} </div>
    ))}
    {[...Array(2)].map((item, index) => (
      <div className={`text-body${index + 1}`}> 我是text-body{index} </div>
    ))}
  </div>
);

export default {
  title: 'UI Colors',
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
