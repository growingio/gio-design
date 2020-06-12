import { createContext } from 'react';
import { IRadioGroupContext } from './interface';

const RadioGroupContext = createContext<IRadioGroupContext | null>(null);

export default RadioGroupContext;

export const RadioGroupProvider = RadioGroupContext.Provider;
