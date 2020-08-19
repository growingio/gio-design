import mock from 'xhr-mock';

export function setup() {
  mock.setup();
  mock.post('/upload', (req, res) => {
    req.headers({
      'content-length': 100,
    });
    req.body('success');
    return res;
  });
}

export const clear = mock.teardown.bind(mock);
