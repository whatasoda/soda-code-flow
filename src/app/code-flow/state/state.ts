import { FlowProfile } from '../../../types/profile';
import { CodeLocation } from '../../../types/profile/codeLocation';
import { ProgramProfile } from '../../../types/profile/custom';
import { ScopeProfile } from '../../../types/profile/scope';
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
  loc?: CodeLocation;
}

interface IdProfile {
  loc: CodeLocation;
  value: any;
}
interface IdProfileMap {
  [scope: number]: IdProfile;
}

export interface IdProfileMaps {
  [name: string]: IdProfileMap | undefined;
}

export interface CustomContext {
  snapshotTargets: SnapshotTarget[];
}

class FlowState {
  public code: string;
  public flow: FlowItem[] = [];
  public scopes: ScopeProfile[];
  public values: ValueContainer = {};
  public identifiers: IdProfileMaps = {};
  public ctx: CustomContext;

  constructor({ code, scopes }: ProgramProfile, ctx: CustomContext) {
    this.code = code;
    this.scopes = scopes;
    this.ctx = ctx;
  }

  public pushFlow(profile: FlowProfile, value: unknown) {
    const snapshots = this.takeSnapshots(profile, value);
    this.flow.push({
      location: profile.loc,
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
    if (profile.decl) {
      const {
        decl: { id: loc },
        scope,
      } = profile;
      const code = this.getCode(loc);
      const idProfile = { loc, value };
      const idProfiles = this.identifiers[code];
      if (!idProfiles) {
        this.identifiers[code] = { [scope]: idProfile };
      } else {
        idProfiles[scope] = idProfile;
      }
    }

    const code = this.getCode(profile.loc);
    const { idProfile } = this.getIdProfile(code, profile.scope);
    if (idProfile) {
      idProfile.value = value;
    }
  }

  private getIdProfile(code: string, scopeId: number) {
    const idProfiles = this.identifiers[code];
    if (idProfiles) {
      const scope = this.findNearestScope(code, this.scopes[scopeId]);
      if (scope) {
        const idProfile = idProfiles[scope.id];
        return { idProfiles, idProfile };
      }
      return { idProfiles };
    }
    return {};
  }

  private findNearestScope(code: string, initial: ScopeProfile): ScopeProfile | null {
    let scope = initial;
    while (scope) {
      if (scope.bindings.includes(code)) {
        return scope;
      }
      scope = this.scopes[scope.parent];
    }
    return null;
  }

  private takeSnapshots(profile: FlowProfile, value: unknown) {
    return this.ctx.snapshotTargets.map<SnapshotResult>((target) => {
      if (!target.key) {
        // DYNAMIC
        const snapshot = takeSnapshot(value);
        const { loc } = profile;
        return { ...target, snapshot, loc };
      } else {
        const { idProfile } = this.getIdProfile(target.key, profile.scope);
        if (idProfile) {
          const variable = idProfile.value;
          const { loc } = idProfile;
          const snapshot = takeSnapshot(variable);
          return { ...target, snapshot, loc };
        }
        return { ...target };
      }
    });
  }

  private getCode([start, end]: CodeLocation) {
    return this.code.slice(start, end);
  }
}

export default FlowState;
