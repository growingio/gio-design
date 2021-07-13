import React from 'react';
import { render, screen } from '@testing-library/react';
import Link from '../index';

describe('Test Link',() => {
    const saveLocation = window.location;
    afterAll(() => {
        delete global.window.location;
        global.window.location = saveLocation;
    });

    it('Link with no error',() => {
        render(<Link to="https://www.growingio.com">Growing</Link>);
        expect(screen).toBeTruthy();
    });

    it('right location',() => {
        render(
            <Link component="div" to="https://www.growingio.com">
                GrowingIO
            </Link>  
        )
        expect('https://www.growingio.com').not.toBeNull();
    })

})