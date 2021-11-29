import * as React from 'react';
import { RadioGroupContextType } from './interface';

const RadioGroupContext = React.createContext<RadioGroupContextType | null>(null);

export default RadioGroupContext;
