import React from 'react';
import TokenTable from './tokenTable';
import { ExampleType } from './interface';
import { shadowExample } from './examples';

export default () => <TokenTable prefix="Shadow" example={shadowExample as ExampleType} />;
