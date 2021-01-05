import React from 'react';
import TokenTable from './tokenTable';
import { ExampleType } from './interface';
import { colorExample } from './examples';

export default () => <TokenTable prefix="ColorBackground" example={colorExample as ExampleType} />;
