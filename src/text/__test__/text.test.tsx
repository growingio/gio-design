import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../Text';
import 'raf/polyfill';

jest.useFakeTimers();

describe('Testing Text', () => {
    
    it('basic text', () => {
        // eslint-disable-next-line react/no-children-prop
        render(<Text children="我是一个栗子" placement="bottom" style={{color: 'red'}} />);
        expect(screen.getByText('我是一个栗子')).toBeTruthy();
    })

    it('mutiple lines', () => {
        render(<div style={{width: '130px'}}>
                <Text lines={3} trimwhitespace>我是另一个栗子我是另一个栗子我是另一个栗子我是另一个栗子</Text>
            </div>);
        expect(screen.getByText('我是另一个栗子我是另一个栗子我是另一个栗子我是另一个栗子')).toBeTruthy();
    })

})