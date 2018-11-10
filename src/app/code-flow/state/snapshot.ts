import { findWindowEntry } from './windowEntires';

export interface SnapshotJSON {
  label: string | null;
  children: { [key: string]: SnapshotJSON } | SnapshotJSON[] | null;
}

class SnapshotNode implements SnapshotJSON {
  public static takeSnapshot(value: unknown) {
    const root = new SnapshotNode(value);
    const stack = [[root]];
    let i = 0;
    while (stack.length !== i) {
      const next: SnapshotNode[] = [];
      stack[i].forEach(({ body, childrenKeys }) => {
        if (!body) {
          return;
        }
        Object.entries(body).forEach(([key, value]) => {
          childrenKeys.push(key);
          next.push(new SnapshotNode(value));
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
  public children: { [key: string]: SnapshotNode } | SnapshotNode[] | null = null;
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
    const entry = findWindowEntry(value);
    if (entry) {
      const { name } = entry;
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

export const { takeSnapshot } = SnapshotNode;
export default SnapshotNode;
