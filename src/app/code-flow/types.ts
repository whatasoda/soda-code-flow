import { FlowProfile } from '../../types/profile';

export interface FlowItem {
  profile: FlowProfile;
  value: any;
}

export interface FlowState {
  registry: FlowItem[];
  values: { [code: string]: any };
  identifiers: Array<{ [id: string]: any }>;
  code: string;
}
