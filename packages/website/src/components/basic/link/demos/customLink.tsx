import React from 'react';
import { Link } from '@gio-design/components';
import '@gio-design/components/es/components/link/style/css.js';

const CustomLinkRoot: React.FC<{}> = ({ children, ...props }) => (
  <span {...props}>{children}</span>
);

export default () => (
  <div>
    <div>
      <Link component="div" to="https://www.growingio.com">
        Element Div
      </Link>
    </div>
    <div>
      <Link
        component={CustomLinkRoot}
        to="https://www.growingio.com"
        onClick={() => {
          console.log('===Log Start===');
          console.log('click on custom link element');
          console.log('---Log End---');
        }}
      >
        Custom Element
      </Link>
    </div>
    <div>
      <Link component={CustomLinkRoot} to="https://www.growingio.com" disabled>
        Disabled Custom Element
      </Link>
    </div>
  </div>
);
