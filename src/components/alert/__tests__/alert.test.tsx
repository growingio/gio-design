import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import { Default, ShowIcon, Closeable } from '../Alert.stories';

describe('Testing Alert', () => {

    it('basic', () => {
        render(<Default {...Default.args} />);
        expect(screen.getByText('default')).toBeTruthy();
    })

    it('show icon', () => {
        render(<ShowIcon {...ShowIcon.args}/>);
        expect(screen.getByText('我是内容')).toBeTruthy();
    })

    it('can be close', () => {
        const mockClick = jest.fn();
        render(<Closeable {...Closeable.args} onClose={mockClick} />);
        fireEvent.click(screen.getByRole('button'))
        expect(mockClick).toBeCalled();
    })
})