import { FlowProfile } from '../../../types/profile';
import { CodeLocation } from '../../../types/profile/codeLocation';
import { ProgramProfile } from '../../../types/profile/custom';
import { ScopeProfile } from '../../../types/profile/scope';
import { getThisArgCode, isIdentifierCode } from '../util/identifier';
import { FlowData, format } from './data';

interface ValueContainer {
  [code: string]: any;
}

export interface FlowItem {
  location: CodeLocation;
  data: FlowData;
}

class FlowState {
  public code: string;
  public flow: FlowItem[] = [];
  public scopes: ScopeProfile[] = [];
  public values: ValueContainer = {};
  public identifiers: ValueContainer[];

  constructor({ code, scopes }: ProgramProfile) {
    this.code = code;
    this.identifiers = scopes.map(() => ({}));
  }

  public pushFlow({ start, end }: CodeLocation, value: any) {
    const data = format({ value });
    this.flow.push({
      location: { start, end },
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
    const code = this.getCode(profile);
    if (!isIdentifierCode(code)) {
      return;
    }

    let scope = this.scopes[profile.scopeId];
    while (scope) {
      if (scope.bindings.includes(code)) {
        this.identifiers[scope.id][code] = value;
        break;
      }
      scope = this.scopes[scope.parent];
    }
  }

  private getCode({ start, end }: CodeLocation) {
    return this.code.slice(start, end);
  }
}

export default FlowState;
