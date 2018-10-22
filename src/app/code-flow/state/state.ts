import { FlowProfile } from '../../../types/profile';
import { CodeLocation } from '../../../types/profile/codeLocation';
import { ProgramProfile } from '../../../types/profile/custom';
import { ScopeProfile } from '../../../types/profile/scope';
import { getThisArgCode, isIdentifierCode } from '../util/identifier';
import { FlowData, format } from './data';
import { ValueContainer } from './types';

export interface FlowItem {
  location: CodeLocation;
  data: FlowData;
}

export interface CustomContext {
  watch: string[];
}

class FlowState {
  public code: string;
  public flow: FlowItem[] = [];
  public scopes: ScopeProfile[];
  public values: ValueContainer = {};
  public identifiers: ValueContainer[];
  public ctx: CustomContext;

  constructor({ code, scopes }: ProgramProfile, ctx: CustomContext) {
    this.code = code;
    this.scopes = scopes;
    this.identifiers = scopes.map(() => ({}));
    this.ctx = ctx;
  }

  public pushFlow([start, end]: CodeLocation, value: any) {
    const snapshot = this.identifierSnapshot();
    const data = format({ value, snapshot });
    this.flow.push({
      location: [start, end],
      data: JSON.parse(JSON.stringify(data)),
    });
  }

  public updateValue(location: CodeLocation, value: any) {
    this.values[this.getCode(location)] = value;
  }

  public getThisArg(location: CodeLocation) {
    const code = getThisArgCode(this.getCode(location));
    return code ? this.values[code] : null;
  }

  public updateIdentifier(profile: FlowProfile, value: any) {
    const code = this.getCode(profile.loc);
    if (!isIdentifierCode(code)) {
      return;
    }

    let scope = this.scopes[profile.scope];
    while (scope) {
      if (scope.bindings.includes(code)) {
        this.identifiers[scope.id][code] = value;
        break;
      }
      scope = this.scopes[scope.parent];
    }
  }

  private identifierSnapshot() {
    return this.ctx.watch.reduce<ValueContainer>(
      (container, key) => ({
        ...container,
        [key]: this.identifiers[0][key],
      }),
      {},
    );
  }

  private getCode([start, end]: CodeLocation) {
    return this.code.slice(start, end);
  }
}

export default FlowState;
