import React from 'react';
import TokenTable from './tokenTable';
import { ExampleType } from './interface';
import { fontSizeExample } from './examples';

export default () => <TokenTable prefix="SizeFont" example={fontSizeExample as ExampleType} />;
