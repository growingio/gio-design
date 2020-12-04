import 'xhr-mock';
import xhrRequest, { getError, getBody } from '../xhrRequest';
import { testFile } from './utils.test';
export const getMock = (status) => {
  const open = jest.fn();
  const onload = jest.fn((x) => {});
  const onerror = jest.fn();
  const send = jest.fn(function () {
    this.onload();
  });
  const withCredentials = true;
  const abort = jest.fn();
  const setRequestHeader = jest.fn();
  const xhrMockClass = function () {
    return {
      open,
      send,
      onerror,
      onload,
      status: status,
      withCredentials,
      setRequestHeader,
      abort,
    };
  };
  return xhrMockClass;
};
describe('Testing Upload xhrRequest', () => {
  const option = {
    data: { name: 'gio', age: '21', hobbies: ['eat', 'sleep'] },
    file: testFile,
    withCredentials: true,
    action: 'http://upload.com',
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    filename: 'web-image',
    onProgress: () => {},
    onSuccess: () => {},
    onError: () => {},
  };
  test('getError function', () => {
    const msg = 'cannot POST http://upload.com 0';
    const err = new Error(msg);
    err.status = 0;
    err.method = 'POST';
    err.url = 'http://upload.com';
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
  test('xhrRequest function', () => {
    global.XMLHttpRequest = jest.fn().mockImplementation(getMock(300));
    xhrRequest(option);
  });
  test('xhrRequest function in different status', () => {
    global.XMLHttpRequest = jest.fn().mockImplementation(getMock(201));
    option.file = 'file';
    xhrRequest(option);
  });
});
