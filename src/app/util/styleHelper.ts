interface ClassNameMap {
  [className: string]: string;
}

const styleHelper = (style: ClassNameMap) => (
  classNames: Array<string | undefined | false | null>,
  nativeClassNames?: Array<string | undefined | false | null>,
) =>
  classNames
    .map((name) => name && style[name])
    .concat(nativeClassNames)
    .filter(Boolean)
    .join(' ');

export default styleHelper;
