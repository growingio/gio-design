import React from 'react';
import TokenTable from './tokenTable';
import { ExampleType } from './interface';
import { spacingSizeExample } from './examples';

export default () => <TokenTable prefix="SizeSpacing" example={spacingSizeExample as ExampleType} />;
