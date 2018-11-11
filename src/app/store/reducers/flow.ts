import { Action } from 'redux';
import { CodeFlowPayload, FlowState } from '../../code-flow';
import { SnapshotTarget } from '../../code-flow/state/state';
import unitRegistry, { ActionsMapOf, ActionsOf } from '../../lib/unit-redux';

interface State {
  status: 'running' | 'fetching' | 'ready' | 'error' | 'changed';
  interval: number;
  step: number;
  lifespan: number;
  loop: boolean;
  code: string;
  base64: string;
  time: number;
  flowState: FlowState | null;
  snapshotTargets: SnapshotTarget[];
}

const base = unitRegistry<State>(() => ({
  status: 'changed',
  interval: 300,
  step: -1,
  lifespan: 0,
  loop: false,
  code: '',
  base64: '',
  time: 0,
  flowState: null,
  snapshotTargets: [],
}));

interface SET_TIME extends Action<'SET_TIME'> {
  time: number;
}
const SET_TIME = base.extention(() =>
  base
    .action<SET_TIME>('SET_TIME')
    .actionCreator((type) => {
      const setTime = (time: number) => ({ type, time });
      return { setTime };
    })
    .reducer((state, { time }) => ({ ...state, time })),
);

// tslint:disable-next-line:interface-name
interface INSERT_SNAPSHOT_TARGET extends Action<'INSERT_SNAPSHOT_TARGET'> {
  position: number;
}
const INSERT_SNAPSHOT_TARGET = base.extention(() =>
  base
    .action<INSERT_SNAPSHOT_TARGET>('INSERT_SNAPSHOT_TARGET')
    .actionCreator((type) => {
      const insertSnapshotTarget = (position: number) => ({ type, position });
      return { insertSnapshotTarget };
    })
    .reducer((state, { position }) => {
      const snapshotTargets = state.snapshotTargets.slice();
      snapshotTargets.splice(position, 0, {
        key: '',
        description: '',
        color: '#ffffff',
      });
      return { ...state, snapshotTargets };
    }),
);

interface UPDATE_SNAPSHOT_TARGET extends Action<'UPDATE_SNAPSHOT_TARGET'> {
  position: number;
  target: Partial<SnapshotTarget>;
}
const UPDATE_SNAPSHOT_TARGET = base.extention(() =>
  base
    .action<UPDATE_SNAPSHOT_TARGET>('UPDATE_SNAPSHOT_TARGET')
    .actionCreator((type) => {
      const updateSnapshotTarget = (position: number, target: Partial<SnapshotTarget>) => ({ type, position, target });
      return { updateSnapshotTarget };
    })
    .reducer((state, { position, target }) => {
      const snapshotTargets = state.snapshotTargets.slice();
      const curr = snapshotTargets[position];
      snapshotTargets[position] = { ...curr, ...target };
      return { ...state, snapshotTargets };
    }),
);

interface MOVE_SNAPSHOT_TARGET extends Action<'MOVE_SNAPSHOT_TARGET'> {
  from: number;
  to: number;
}
const MOVE_SNAPSHOT_TARGET = base.extention(() =>
  base
    .action<MOVE_SNAPSHOT_TARGET>('MOVE_SNAPSHOT_TARGET')
    .actionCreator((type) => {
      const moveSnapshotTarget = (from: number, to: number) => ({ type, from, to });
      return { moveSnapshotTarget };
    })
    .reducer((state, { from, to }) => {
      if (from === to) {
        return state;
      }
      const snapshotTargets = state.snapshotTargets.slice();
      const sliced = snapshotTargets.splice(from, 1);
      snapshotTargets.splice(from < to ? to - 1 : to, 0, ...sliced);
      return { ...state, snapshotTargets };
    }),
);

interface ASSIGN_CODE_FLOW extends Action<'ASSIGN_CODE_FLOW'> {
  flowState: FlowState;
  base64: string;
}
const ASSIGN_CODE_FLOW = base.extention(() =>
  base
    .action<ASSIGN_CODE_FLOW>('ASSIGN_CODE_FLOW')
    .actionCreator((type) => {
      const assignCodeFlow = ({ state: flowState, base64 }: CodeFlowPayload) => ({ type, flowState, base64 });
      return { assignCodeFlow };
    })
    .reducer((state, { flowState, base64 }) => {
      const lifespan = flowState.flow.length;
      return { ...state, flowState, base64, lifespan };
    }),
);

interface SET_STATUS extends Action<'SET_STATUS'> {
  status: State['status'];
}
const SET_STATUS = base.extention(() =>
  base
    .action<SET_STATUS>('SET_STATUS')
    .actionCreator((type) => {
      const setStatus = (status: State['status']) => ({ type, status });
      return { setStatus };
    })
    .reducer((state, { status }) => ({ ...state, status })),
);

interface SET_STEP extends Action<'SET_STEP'> {
  step: number;
}
const SET_STEP = base.extention(() =>
  base
    .action<SET_STEP>('SET_STEP')
    .actionCreator((type) => {
      const setStep = (step: number) => ({ type, step });
      return { setStep };
    })
    .reducer((state, { step }) => ({ ...state, step })),
);

interface UPDATE_INTERVAL extends Action<'UPDATE_INTERVAL'> {
  interval: number;
}
const UPDATE_INTERVAL = base.extention(() =>
  base
    .action<UPDATE_INTERVAL>('UPDATE_INTERVAL')
    .actionCreator((type) => {
      const updateInterval = (interval: number) => ({ type, interval });
      return { updateInterval };
    })
    .reducer((state, action) => {
      const { interval } = action;
      return { ...state, interval };
    }),
);

interface SET_CODE extends Action<'SET_CODE'> {
  code: string;
}
const SET_CODE = base.extention(() =>
  base
    .action<SET_CODE>('SET_CODE')
    .actionCreator((type) => {
      const setCode = (code: string) => ({ type, code });
      return { setCode };
    })
    .reducer((state, action) => {
      const { code } = action;
      return { ...state, code };
    }),
);

const registry = base
  .combine(SET_TIME)
  .combine(INSERT_SNAPSHOT_TARGET)
  .combine(UPDATE_SNAPSHOT_TARGET)
  .combine(MOVE_SNAPSHOT_TARGET)
  .combine(ASSIGN_CODE_FLOW)
  .combine(SET_STATUS)
  .combine(SET_STEP)
  .combine(UPDATE_INTERVAL)
  .combine(SET_CODE);

export const flowActionTypes = registry.getActionTypes();
export const flowActionCreators = registry.getActionCreators();
export type FlowActions = ActionsOf<typeof registry>;
export type FlowActionsMap = ActionsMapOf<FlowActions>;

const flow = registry.getComposedReducer();
export default flow;
