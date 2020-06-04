import { mount } from 'enzyme';
import greeting from '..';

describe('Testing Greeting', () => {
  it('should be able to render component', () => {
    greeting.info('Good Afternoon，Tom');
    expect(document.querySelectorAll('.gio-greeting').length).toBe(1);
  });

  it('should be able to render text currently ', () => {
    greeting.info('Good Afternoon，Tom');
    expect(document.querySelectorAll('.gio-greeting-tip')[0].textContent).toBe('Good Afternoon，Tom');
  });

  it('should be able to destroy', () => {
    greeting.info('Good Afternoon，Tom');
    expect(document.querySelectorAll('.gio-greeting').length).toBe(1);
    greeting.destory();
    expect(document.querySelectorAll('.gio-greeting').length).toBe(0);
  });
});
