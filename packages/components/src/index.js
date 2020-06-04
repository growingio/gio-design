import React from 'react';
import ReactDOM from 'react-dom';

import Playground from './Playground';

const title = 'Gio Design';

ReactDOM.render(<Playground title={title} />, document.getElementById('app'));

module.hot.accept();
