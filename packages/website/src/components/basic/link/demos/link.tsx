import React from 'react';
import { Link } from '@gio-design/components';
import '@gio-design/components/es/components/link/style/css.js';

export default () => (
  <div>
    <div>
      <Link to="https://www.growingio.com">GrowingIO</Link>
    </div>
    <div>
      <Link to="https://www.growingio.com" target="__blank">
        Open GrowingIO with a new blank tab
      </Link>
    </div>
    <div>
      <Link disabled to="https://www.growingio.com">
        Disabled
      </Link>
    </div>
  </div>
);
