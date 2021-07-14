import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Link from '../index';
import { Default } from '../Link.stories'

describe('Test Link',() => {
    const saveLocation = window.location;
    afterAll(() => {
        delete global.window.location;
        global.window.location = saveLocation;
      });

    it('default', () => {
        render(<Default {...Default.args} />);
        expect(screen.getAllByRole('link')).toHaveLength(2);
    });

    it('should mount and unmount Link with no error.', () => {
        const {rerender} = render(<Link to="https://www.growingio.com">GrowingIO</Link>);
        rerender(<Link to="https://www.growingio.com">GrowingIO</Link>);
        expect(screen.getAllByRole('link')).toHaveLength(1);
    });

    it('test click', () => {
        const onClick = jest.fn();
        render(
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link component="div" to="https://www.growingio.com" onClick={onClick}>
            GrowingIO
          </Link>
        );
        fireEvent.click(screen.getByText('GrowingIO'));
        expect(onClick).toBeCalled();
    });

    it('disabled link', () => {
        const onClick = jest.fn();
        render(
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <Link component="div" to="https://www.growingio.com" disabled onClick={onClick}>
              GrowingIO
            </Link>
        ); 
        fireEvent.click(screen.getByText('GrowingIO'));
        expect(onClick).not.toBeCalled();
    });

    it('right pointing', () => {
        delete global.window.location;
        global.window.location = { ...global.window.location, href:''};
        render(
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <Link component="div" to="https://www.growingio.com">
                GrowingIO
            </Link>
        );
        fireEvent.click(screen.getByText('GrowingIO'));
        expect(window.location.href).toBe('https://www.growingio.com');
    });

    it('error pointing', () => {
        delete global.window.location;
        global.window.location = { ...global.window.location, href:''};
    
        render(
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link component="div" to={undefined}>
            GrowingIO
          </Link>
        );
        fireEvent.click(screen.getByText('GrowingIO'));
        expect(window.location.href).not.toBe('https://www.growingio.com');
    });
})