const styleHelper = (style: { [className: string]: string }) => (...classNames: Array<string | undefined>) =>
  classNames.map((name) => (name ? style[name] || name : '')).join(' ');

export default styleHelper;
