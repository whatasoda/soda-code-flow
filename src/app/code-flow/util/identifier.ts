const identifier = /^[$_0-9a-zA-Z]+$/;
export const isIdentifierCode = (code: string) => identifier.test(code);

const thisArg = /^(.*?)\.[$_0-9a-zA-Z]+$/;
export const getThisArgCode = (code: string) => {
  const match = code.match(thisArg);
  if (!match) {
    return null;
  }
  return match[1];
};
