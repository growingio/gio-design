export const convertToken = (token: string) => token.replace(/[A-Z|\d*]/g, (match) => match ? '-' + match.toLowerCase() : '');
