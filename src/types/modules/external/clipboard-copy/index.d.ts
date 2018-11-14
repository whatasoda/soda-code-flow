declare module 'clipboard-copy' {
  export = copy;

  declare function copy(text: string): Promise<'success'>;
  declare namespace copy {

  }
}
