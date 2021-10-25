import * as React from 'react';
import { SwitchGroupContextType } from './interface';

const SwitchGroupContext = React.createContext<SwitchGroupContextType | null>(null);

export default SwitchGroupContext;
