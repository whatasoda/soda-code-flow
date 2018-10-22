import { ValueContainer } from './types';

export interface FlowData {
  value: any;
  snapshot: ValueContainer;
}

export const format = (data: FlowData) => data;
