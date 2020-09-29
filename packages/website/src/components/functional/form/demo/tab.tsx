import '@gio-design/components/es/components/form/style/index.css';

import './index.less';

import React from 'react';

import { Tabs, TabPane } from '@gio-design/components';

import InputsForm from './inputs';

const Tab: React.FC = () => {
  return (
    <Tabs type="line">
      {[1, 2, 3].map((n) => (
        <TabPane tab={`tab-${n}`} key={n}>
          <h3>tab-{n}</h3>
          <InputsForm name={`tab-${n}`} />
        </TabPane>
      ))}
    </Tabs>
  );
};

export default Tab;
