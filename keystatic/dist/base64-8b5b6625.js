function bytesToHex(bytes) {
  let str = '';
  for (const byte of bytes) {
    str += byte.toString(16).padStart(2, '0');
  }
  return str;
}

function base64UrlDecode(base64) {
  const binString = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(binString, m => m.codePointAt(0));
}
function base64UrlEncode(bytes) {
  return base64Encode(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
function base64Encode(bytes) {
  const binString = Array.from(bytes, byte => String.fromCodePoint(byte)).join('');
  return btoa(binString);
}

export { base64UrlEncode as a, base64UrlDecode as b, base64Encode as c, bytesToHex as d };
