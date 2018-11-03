import { ValueContainer } from './types';

export interface FlowData {
  value: any;
  snapshot: ValueContainer;
}

export const format = (data: FlowData) => {
  const value = DescriptorNode.deep(data.value);
  const snapshot = Object.keys(data.snapshot).reduce<ValueContainer>(
    (snapshot, key) => ({
      ...snapshot,
      [key]: DescriptorNode.deep(data.snapshot[key]),
    }),
    {},
  );
  return { value, snapshot };
};

const windowEntries = Object.entries(Object.getOwnPropertyDescriptors(window))
  .filter(
    ([_, { enumerable, value }]) =>
      !enumerable &&
      typeof value !== 'undefined' &&
      typeof value !== 'number' &&
      typeof value !== 'string' &&
      typeof value !== 'boolean' &&
      value !== null,
  )
  .map<[string, any]>(([key, { value }]) => [key, value]);

export interface DescriptorJSON {
  label: string | null;
  children: { [key: string]: DescriptorJSON } | DescriptorJSON[] | null;
}

class DescriptorNode implements DescriptorJSON {
  public static deep(value: unknown) {
    const root = new DescriptorNode(value);
    const stack = [[root]];
    let i = 0;
    while (stack.length !== i) {
      const next: DescriptorNode[] = [];
      stack[i].forEach(({ body, childrenKeys }) => {
        if (!body) {
          return;
        }
        Object.entries(body).forEach(([key, value]) => {
          childrenKeys.push(key);
          next.push(new DescriptorNode(value));
        });
      });
      i = stack.length;
      if (next.length) {
        stack.push(next);
      }
    }

    for (let i = stack.length - 1; i >= 0; i--) {
      const upper = stack[i];
      const lower = stack[i + 1];
      if (!upper) {
        continue;
      }

      upper.forEach((node) => {
        const { body } = node;
        if (!body) {
          return;
        }
        node.children = Array.isArray(body) ? [] : {};
        node.childrenKeys.forEach((key) => ((node.children as any)[key] = lower.shift()));
      });
    }
    return JSON.parse(JSON.stringify(root));
  }

  public label: string | null = null;
  public children: { [key: string]: DescriptorNode } | DescriptorNode[] | null = null;
  private body: object | any[] | null = null;
  private childrenKeys: string[] = [];
  constructor(value: unknown) {
    this.format(value);
  }

  public toJSON() {
    const { label, children } = this;
    return { label, children };
  }

  private format(value: unknown) {
    const desc = windowEntries.find(([_, val]) => value === val);
    if (desc) {
      const name = desc[0];
      this.label = `[global ${name}]`;
    } else if (typeof value === 'undefined') {
      this.label = 'undefined';
    } else if (value === null) {
      this.label = 'null';
    } else if (typeof value === 'function') {
      this.label = value.name ? `[Function ${value.name}]` : '[Anonymous Function]';
      this.body = Object.keys(value).length ? { ...value } : null;
    } else if (typeof value === 'symbol') {
      this.label = `[${value.toString()}]`;
    } else if (Array.isArray(value)) {
      this.body = value.slice();
    } else if (typeof value === 'object') {
      interface TPrototype {
        constructor: (...args: any[]) => any;
      }
      const { constructor }: TPrototype = Object.getPrototypeOf(value);
      const isSimpleObject = constructor === Object;
      this.label = isSimpleObject ? null : `[${constructor.name}]`;
      this.body = { ...value };
    } else {
      this.label = JSON.stringify(value);
    }
  }
}
