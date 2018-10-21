declare module '*.css' {
  export = style;
  const style: {
    [className: string]: string;
  };
}
