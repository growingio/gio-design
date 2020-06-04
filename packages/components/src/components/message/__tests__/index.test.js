import message from '..';

describe('message', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    message.destory();
  });

  it('should display correctly', () => {
    message.success('success');
    expect(document.querySelectorAll('.gio-message').length).toBe(1);
  });
});
