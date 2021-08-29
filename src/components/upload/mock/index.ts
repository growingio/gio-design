/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable no-nested-ternary */
/* \
|*|  mock for test
|*|  Base64 / binary data / UTF-8 strings utilities (#1)
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
|*|
|*|  Author: madmurphy
|*|
\ */

/* Array of bytes to base64 string decoding */

export function base64DecToArr(sBase64: any, nBlockSize: any) {
  const b64ToUint6 = (nChr: any) => {
    switch (nChr) {
      case nChr > 64 && nChr < 91:
        return nChr - 65;
      case nChr > 96 && nChr < 123:
        return nChr - 71;
      case nChr > 47 && nChr < 58:
        return nChr + 4;
      case nChr === 43:
        return 62;
      case nChr === 47:
        return 63;
      default:
        return 0;
    }
  };

  // eslint-disable-next-line no-useless-escape
  const sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, '');
  const nInLen = sB64Enc.length;
  const nOutLen = nBlockSize ? Math.ceil(((nInLen * 3 + 1) >>> 2) / nBlockSize) * nBlockSize : (nInLen * 3 + 1) >>> 2;
  const aBytes = new Uint8Array(nOutLen);

  for (let nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
    nMod4 = nInIdx & 3;
    nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << (18 - 6 * nMod4);
    if (nMod4 === 3 || nInLen - nInIdx === 1) {
      for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
        aBytes[nOutIdx] = (nUint24 >>> ((16 >>> nMod3) & 24)) & 255;
      }
      nUint24 = 0;
    }
  }

  return aBytes;
}

export const url = 'https://avatars1.githubusercontent.com/u/10370210?s=400&v=4';
export const dataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAADcraK0+MxzU+LliTzh4N/0dwAc';

const getFile = (_dataUrl: any) => {
  const arr = _dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    u8arr[n] = bstr.charCodeAt(n);
    n -= 1;
  }

  return new File([u8arr], 'web-image', { type: mime });
};
export const testFile = getFile(dataUrl);
