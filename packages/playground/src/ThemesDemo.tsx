import React, { useState } from 'react';
import themes from '@gio-design/themes';
import { ThemeContext } from './context';
import Hello from './Hello';

const ThemesDemo = (props) => {
  const [theme, toggleTheme] = useState('indigo');
  return (
    <ThemeContext.Provider value={{ theme: themes[theme], toggleTheme: toggleTheme }}>
      <div>
        <ThemeContext.Consumer>
          {
            ({ theme, toggleTheme }) => (<Hello theme={theme} toggleTheme={toggleTheme} />)
          }
        </ThemeContext.Consumer>
      </div>
    </ThemeContext.Provider>
  )
}

export default ThemesDemo;