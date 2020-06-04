import React, { useContext } from 'react';
import Icon from '@gio-design/icon';
import { ThemeContext } from './context';
import styled from 'styled-components';
import Input from '@gio-design/components/lib/input';
import Button from '@gio-design/components/lib/button';

const Search = Input.Search;

const Hello = (props:any) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Wrapper theme={theme}>
      <button onClick={() => toggleTheme('origin')}>origin</button>
      <button onClick={() => toggleTheme('indigo')}>indigo</button>
      <br />
      <Icon type='wechat' />
      GrowingIO Design System Themes
      <Input />
      <Search />
      <Button>hello</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: ${props => props.theme.colorPrimary}
`;

export default Hello;