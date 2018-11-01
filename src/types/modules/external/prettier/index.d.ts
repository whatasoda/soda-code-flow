declare module 'prettier/standalone' {
  import * as Prettier from 'prettier';
  export = standalone;
  const standalone: Pick<typeof Prettier, 'format'>;
}

declare module 'prettier/parser-babylon' {
  import * as Prettier from 'prettier';
  export = plugin;
  const plugin: Prettier.Plugin;
}
