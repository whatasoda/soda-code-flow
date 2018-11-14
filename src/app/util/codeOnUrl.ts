import * as qs from 'querystring';

export const getCodeFromUrl = () => {
  const query = qs.parse(window.location.href.split('?')[1]);
  return query.b ? (Array.isArray(query.b) ? query.b[0] : query.b) : null;
};

export const setCodeIntoUrl = (base64: string | null) => {
  const [url] = window.location.href.split('?');
  const search = qs.stringify(base64 ? { b: base64 } : {});
  window.history.pushState(null, document.title, `${url}?${search}`);
};
