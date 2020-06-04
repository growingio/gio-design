import React from 'react';
import { any } from 'prop-types';

export const ThemeContext = React.createContext({
  theme: {},
  toggleTheme: any
});
