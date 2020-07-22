import React from 'react';
import { Popover, Checkbox, CheckboxGroup, Link } from '@gio-design/components';
import '@gio-design/components/es/components/popover/style/index.css';
import './index.less';
import image from './2vcode.svg';

const Button = (props: { children: React.ReactNode }) => (
  <span className="button">{props.children}</span>
);

export default () => (
  <>
    <Popover
      placement="topLeft"
      contentArea={<img width={120} height={120} src={image} />}
      footerArea={<Button>下载二维码</Button>}
      arrowPointAtCenter={true}
    >
      <span className="popoverSpan">Arrow points to center / 箭头指向中心</span>
    </Popover>
    <Popover
      placement="topLeft"
      contentArea={<img width={120} height={120} src={image} />}
      footerArea={<Button>下载二维码</Button>}
    >
      <span className="popoverSpan">Align edge / 边缘对齐</span>
    </Popover>
  </>
);
