import { Values } from '../../types/util';

interface PropType {
  [key: string]: any;
}

type DispatchPropKeysOf<TProps extends PropType> = Values<
  { [K in keyof TProps]: TProps[K] extends (...args: any[]) => any ? K : never }
>;

type StatePropKeyOf<TProps extends PropType> = Exclude<keyof TProps, DispatchPropKeysOf<TProps>>;

export type DispatchPropsOf<TProps extends PropType> = Pick<TProps, DispatchPropKeysOf<TProps>>;
export type StatePropsOf<TProps extends PropType> = Pick<TProps, StatePropKeyOf<TProps>>;
