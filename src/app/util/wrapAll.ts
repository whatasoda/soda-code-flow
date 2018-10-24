type AnyFunc = (...args: any[]) => any;
interface FuncMap {
  [key: string]: AnyFunc;
}

const wrapAll = <TWrapper extends AnyFunc, TMap extends FuncMap>(wrapper: TWrapper, mapObject: TMap): TMap =>
  Object.keys(mapObject).reduce<FuncMap>((funcMap, key) => {
    const func = mapObject[key];
    return {
      ...funcMap,
      [key]: (...args) => wrapper(func(...args)),
    };
  }, {}) as TMap;

export default wrapAll;
