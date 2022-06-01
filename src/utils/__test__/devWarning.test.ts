import { noop } from 'lodash';
import devWarning from '../devWarning';

describe('devWarning.ts', () => {
  it('Should output a message with the component name', () => {
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(noop);
    devWarning(false, 'Alert', 'test hello world');
    expect(warnSpy).toHaveBeenCalledWith('Warning: [gio: Alert] test hello world');

    devWarning(true, 'Table', 'test1');
    expect(warnSpy).not.toHaveBeenCalledWith('Warning: [gio: Table] test1');

    warnSpy.mockRestore();
  });
});
