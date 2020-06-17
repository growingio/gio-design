import React from 'react';
import { Link } from '@gio-design/components';
import '@gio-design/components/es/components/link/style/css.js';

export default () => (
  <div>
    <div>
      <Link to="www.growingio.com">GrowingIO</Link>
    </div>
    <div>
      <Link disabled to="www.growingio.com">
        Disabled
      </Link>
    </div>
  </div>
);
