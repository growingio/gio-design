import { fakeXhr } from 'nise';
import { set, get } from 'lodash';
import xhrRequest, { getError, getBody } from '../xhrRequest';

let mockXhr: any = null;
let currentRequest: any = null;
const API_URL = '/api/upload';
const option = {
  data: { name: 'gio', age: '21', hobbies: ['eat', 'sleep'] },
  file: 'file',
  filename: 'filename.png',
  withCredentials: true,
  action: API_URL,
  method: 'POST',
  onProgress: () => null as any,
  onSuccess: () => null as any,
  onError: () => null as any,
};

describe('xhrRequest', () => {
  beforeEach(() => {
    mockXhr = fakeXhr.useFakeXMLHttpRequest();
    // eslint-disable-next-line no-return-assign
    mockXhr.onCreate = (request: any) => (currentRequest = request);
  });

  afterEach(() => {
    mockXhr.restore();
    currentRequest = null;
  });

  test('upload request success', (done) => {
    expect.assertions(2);

    option.onSuccess = ((response: any) => {
      expect(response).toEqual({ message: 'success', success: true });
      expect(currentRequest.requestBody.getAll('hobbies[]')).toEqual(['eat', 'sleep']);
      done();
    }) as () => void;

    xhrRequest(option as any);
    currentRequest.respond(
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({ message: 'success', success: true })
    );
  });

  test('use real file', (done) => {
    expect.assertions(1);
    const mockFile = new File(['foo'], 'foo.png', {
      type: 'image/png',
    });
    option.file = mockFile as any;
    option.onSuccess = (() => {
      expect(currentRequest.requestBody.getAll(option.filename)[0].name).toEqual(get(option.file, 'name'));
      done();
    }) as () => void;
    xhrRequest(option as any);

    currentRequest.respond(
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({ message: 'upload success', success: true })
    );
  });

  test('should trigger onError 1', (done) => {
    expect.assertions(2);
    option.onError = ((progressEvent: any, response: any) => {
      expect(progressEvent.type).toEqual('error');
      expect(response).toEqual({});
      done();
    }) as () => void;
    xhrRequest(option as any);
    currentRequest.error();
  });

  test('should trigger onError 2', (done) => {
    expect.assertions(2);
    option.onError = ((error: any, response: any) => {
      expect(error.toString()).toContain(`cannot POST ${API_URL} 404`);
      expect(response).toEqual({ success: false, status: 404 });
      done();
    }) as any;
    xhrRequest(option as any);
    currentRequest.respond(404, {}, JSON.stringify({ success: false, status: 404 }));
  });

  test('should trigger abort', () => {
    set(option, 'headers', {
      foo: null,
      form: 'form',
    });
    const { abort } = xhrRequest(option as any);
    expect(() => abort()).not.toThrowError();
  });
});

describe('other', () => {
  test('getError function', () => {
    const msg = `cannot POST ${API_URL} 0`;
    const err = new Error(msg);
    set(err, 'status', 0);
    set(err, 'method', 'POST');
    set(err, 'url', API_URL);
    const xhr = new XMLHttpRequest();
    expect(getError(option as any, xhr)).toEqual(err);
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
