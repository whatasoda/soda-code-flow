import { FlowProfile } from '../../../types/profile';
import { CodeLocation } from '../../../types/profile/codeLocation';
import { ProgramProfile } from '../../../types/profile/custom';
import { ScopeProfile } from '../../../types/profile/scope';
import { isIdentifierCode } from '../util/identifier';
import { SnapshotJSON, takeSnapshot } from './snapshot';
import { ValueContainer } from './types';

export interface FlowItem {
  location: CodeLocation;
  snapshots: SnapshotResult[];
}

export interface SnapshotTarget {
  key: string | null;
  description: string;
  color: string;
}
export interface SnapshotResult extends SnapshotTarget {
  snapshot?: SnapshotJSON;
}

export interface CustomContext {
  snapshotTargets: SnapshotTarget[];
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

  public pushFlow([start, end]: CodeLocation, value: unknown) {
    const snapshots = this.takeSnapshots(value);
    this.flow.push({
      location: [start, end],
      snapshots,
    });
  }

  public updateValue(location: CodeLocation, value: any) {
    this.values[this.getCode(location)] = value;
  }

  public getThisArg({ tobj }: FlowProfile) {
    if (!tobj) {
      return null;
    }
    const code = this.getCode(tobj.obj);
    return code ? this.values[code] : null;
  }

  public updateIdentifier(profile: FlowProfile, value: any) {
    const code = this.getCode(profile.loc);
    const scope = this.findScope(code, this.scopes[profile.scope]);

    if (scope) {
      this.identifiers[scope.id][code] = value;
    }
  }

  private findScope(code: string, initial: ScopeProfile): ScopeProfile | null {
    if (isIdentifierCode(code)) {
      let scope = initial;
      while (scope) {
        if (scope.bindings.includes(code)) {
          return scope;
        }
        scope = this.scopes[scope.parent];
      }
    }
    return null;
  }

  private takeSnapshots(value: unknown) {
    return this.ctx.snapshotTargets.map<SnapshotResult>((target) => {
      if (!target.key) {
        const snapshot = takeSnapshot(value);
        return { ...target, snapshot };
      } else {
        const variable = this.identifiers[0][target.key];
        const snapshot = takeSnapshot(variable);
        return { ...target, snapshot };
      }
    });
  }

  private getCode([start, end]: CodeLocation) {
    return this.code.slice(start, end);
  }
}

export default FlowState;
