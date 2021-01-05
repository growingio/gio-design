import React from 'react';
import TokenTable from './tokenTable';
import { ExampleType } from './interface';
import { fontWeightExample } from './examples';

export default () => <TokenTable prefix="WeightFont" example={fontWeightExample as ExampleType} />;
