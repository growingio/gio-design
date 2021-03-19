import { fakeXhr } from 'nise';
import xhrRequest, { getError, getBody } from '../xhrRequest';
let mockXhr = null;
let currentRequest = null;
const API_URL = '/api/upload';
const option = {
  data: { name: 'gio', age: '21', hobbies: ['eat', 'sleep'] },
  file: 'file',
  filename: 'filename.png',
  withCredentials: true,
  action: API_URL,
  method: 'POST',
  onProgress: () => {},
  onSuccess: () => {},
  onError: () => {},
};

describe('xhrRequest', () => {
  beforeEach(() => {
    mockXhr = fakeXhr.useFakeXMLHttpRequest();
    mockXhr.onCreate = (request) => (currentRequest = request);
  });

  afterEach(() => {
    mockXhr.restore();
    currentRequest = null;
  });

  test('upload request success', (done) => {
    expect.assertions(2);

    option.onSuccess = (response) => {
      expect(response).toEqual({ message: 'upload success', success: true });
      expect(currentRequest.requestBody.getAll('hobbies[]')).toEqual(['eat', 'sleep']);
      done();
    };

    xhrRequest(option);
    currentRequest.respond(
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({ message: 'upload success', success: true })
    );
  });

  test('use real file', (done) => {
    expect.assertions(1);
    const mockFile = new File(['foo'], 'foo.png', {
      type: 'image/png',
    });
    option.file = mockFile;
    option.onSuccess = (_response) => {
      expect(currentRequest.requestBody.getAll(option.filename)[0].name).toEqual(option.file.name);
      done();
    };
    xhrRequest(option);

    currentRequest.respond(
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({ message: 'upload success', success: true })
    );
  });

  test('should trigger onError 1', (done) => {
    expect.assertions(2);
    option.onError = (progressEvent, response) => {
      expect(progressEvent.type).toEqual('error');
      expect(response).toEqual({});
      done();
    };
    xhrRequest(option);
    currentRequest.error();
  });

  test('should trigger onError 2', (done) => {
    expect.assertions(2);
    option.onError = (error, response) => {
      expect(error.toString()).toContain(`cannot POST ${API_URL} 404`);
      expect(response).toEqual({ success: false, status: 404 });
      done();
    };
    xhrRequest(option);
    currentRequest.respond(404, {}, JSON.stringify({ success: false, status: 404 }));
  });

  test('should trigger abort', () => {
    option.headers = {
      foo: null,
      form: 'form',
    };
    const { abort } = xhrRequest(option);
    expect(() => abort()).not.toThrowError();
  });
});

describe('other', () => {
  test('getError function', () => {
    const msg = `cannot POST ${API_URL} 0`;
    const err = new Error(msg);
    err.status = 0;
    err.method = 'POST';
    err.url = API_URL;
    const xhr = new XMLHttpRequest();
    expect(getError(option, xhr)).toEqual(err);
  });

  test('getBody function without text', () => {
    const xhr = new XMLHttpRequest();
    getBody(xhr);
  });

  test('getBody function with text', () => {
    const xhr = new XMLHttpRequest();
    Object.defineProperty(xhr, 'responseText', {
      value: '{"name": "gio"}',
      writable: true,
    });
    expect(getBody(xhr)).toEqual({ name: 'gio' });
  });

  test('getBody function with text catch err', () => {
    const xhr = new XMLHttpRequest();
    Object.defineProperty(xhr, 'responseText', {
      value: 'hh',
      writable: true,
    });
    expect(getBody(xhr)).toBe('hh');
  });
});
