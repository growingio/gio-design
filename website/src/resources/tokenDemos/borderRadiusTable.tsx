import React from 'react';
import TokenTable from './tokenTable';
import { ExampleType } from './interface';
import { borderRadiusExample } from './examples';

export default () => <TokenTable prefix="RadiusBorder" example={borderRadiusExample as ExampleType} />;
