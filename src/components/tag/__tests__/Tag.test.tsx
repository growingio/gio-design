import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react' ;
import { Default } from '../Tag.stories';
import { isToggleClose } from '../Tag';
import Tag from '../index';

describe('Testing Tag', () => {
    it('default',() =>{
        render(<Default {...Default.args} />);
        expect(screen.getByText('已上线')).toBeTruthy();;
    });

    it('Test Close ', () => {
        const onClick = jest.fn();
        const onClose = () => {
          expect(true).toBe(true);
        };
        const {container} = render(<Tag closable persistCloseIcon onClose={onClose} onClick={onClick}>测试</Tag>);
        expect(container.getElementsByTagName('.gio-tag-closable-icon')).toBeTruthy();
        fireEvent.click(screen.getByText('测试'));   
    });

    it('isPersistClose', () => {
        expect(isToggleClose(true, true)).toBe(false);
        expect(isToggleClose(true, false)).toBe(true);
        expect(isToggleClose(false, true)).toBe(false);
        expect(isToggleClose(false, false)).toBe(false);
        expect(isToggleClose()).toBe(false);
    });
})