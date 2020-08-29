export function dasherize(text: string) {
  return text.replace(/[A-Z]|\d*/g, (match) => (match ? '-' + match.toLowerCase() : '')).slice(1);
}

export function isWhite(color: string) {
  return color.toLowerCase() === '#ffffff';
}
