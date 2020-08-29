import React from 'react';
import TokenTable from './tokenTable';
import { ExampleType } from './interface';
import { fontFamilyExample } from './examples';

export default () => <TokenTable prefix="FontFamily" example={fontFamilyExample as ExampleType} />;
