import { Action } from 'redux';
import { CodeFlowPayload, FlowState } from '../../code-flow';
import unitRegistry, { ActionsMapOf, ActionsOf } from '../../lib/unit-redux';

interface State {
  status: 'running' | 'fetching' | 'ready' | 'error' | 'changed';
  interval: number;
  step: number;
  lifespan: number;
  loop: boolean;
  code: string;
  base64: string;
  flowState: FlowState | null;
  watch: string[];
}

const base = unitRegistry<State>(() => ({
  status: 'changed',
  interval: 300,
  step: -1,
  lifespan: 0,
  loop: false,
  code: '',
  base64: '',
  flowState: null,
  watch: [],
}));

// tslint:disable-next-line:interface-name
interface INSERT_WATCH_TARGET extends Action<'INSERT_WATCH_TARGET'> {
  position: number;
}
const INSERT_WATCH_TARGET = base.extention(() =>
  base
    .action<INSERT_WATCH_TARGET>('INSERT_WATCH_TARGET')
    .actionCreator((type) => {
      const insertWatchTarget = (position: number) => ({ type, position });
      return { insertWatchTarget };
    })
    .reducer((state, { position }) => {
      const watch = state.watch.slice();
      watch.splice(position, 0, '');
      return { ...state, watch };
    }),
);

interface SET_WATCH_TARGET_NAME extends Action<'SET_WATCH_TARGET_NAME'> {
  position: number;
  name: string;
}
const SET_WATCH_TARGET_NAME = base.extention(() =>
  base
    .action<SET_WATCH_TARGET_NAME>('SET_WATCH_TARGET_NAME')
    .actionCreator((type) => {
      const setWatchTargetName = (position: number, name: string) => ({ type, position, name });
      return { setWatchTargetName };
    })
    .reducer((state, { position, name }) => {
      const watch = state.watch.slice();
      watch[position] = name;
      return { ...state, watch };
    }),
);

interface MOVE_WATCH_ORDER extends Action<'MOVE_WATCH_ORDER'> {
  from: number;
  to: number;
}
const MOVE_WATCH_ORDER = base.extention(() =>
  base
    .action<MOVE_WATCH_ORDER>('MOVE_WATCH_ORDER')
    .actionCreator((type) => {
      const moveWatchOrder = (from: number, to: number) => ({ type, from, to });
      return { moveWatchOrder };
    })
    .reducer((state, { from, to }) => {
      const watch = state.watch.slice();
      watch.splice(to, 0, ...watch.splice(from, 1));
      return { ...state, watch };
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
  .combine(INSERT_WATCH_TARGET)
  .combine(SET_WATCH_TARGET_NAME)
  .combine(MOVE_WATCH_ORDER)
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
