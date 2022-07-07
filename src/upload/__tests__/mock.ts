import xhrMock from 'xhr-mock';

export function setup() {
  xhrMock.setup();
  xhrMock.post('http://upload.com/', (req, res) => {
    req.headers({
      'content-length': '200',
    });
    return res;
  });
}

export const teardown = () => xhrMock.teardown();
