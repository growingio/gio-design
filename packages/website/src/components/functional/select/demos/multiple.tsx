import React from 'react';
import { Select } from '@gio-design/components';
import '@gio-design/components/es/components/select/style/index.css';

import { optionsWithoutGroup } from './options';

const Basics = (): React.ReactNode => <Select options={optionsWithoutGroup} multiple style={{ width: 140 }} />;

export default Basics;
