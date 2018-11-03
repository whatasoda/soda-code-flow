import { connect } from '../../lib/effect-redux';
import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';

interface SetKeyContext {
  updateSnapshotTarget: ActionCreatorsMap['flow']['updateSnapshotTarget'];
}

const setKey = connect<State, SetKeyContext>(
  () => ({}),
  (dispatch) => {
    const { updateSnapshotTarget } = actionCreators.flow;
    return wrapAll(dispatch, { updateSnapshotTarget });
  },
)(({ updateSnapshotTarget }, index: number, key: string | null) => {
  key = key || null;
  updateSnapshotTarget(index, { key });
});

export default setKey;
