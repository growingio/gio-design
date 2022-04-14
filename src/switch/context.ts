import * as React from 'react';
import { SwitchContextType } from './interface';

const SwitchContext = React.createContext<SwitchContextType | null>(null);

export default SwitchContext;
