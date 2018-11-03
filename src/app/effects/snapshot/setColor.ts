import { connect } from '../../lib/effect-redux';
import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';

interface SetColorContext {
  updateSnapshotTarget: ActionCreatorsMap['flow']['updateSnapshotTarget'];
}

const setColor = connect<State, SetColorContext>(
  ({}) => ({}),
  (dispatch) => {
    const { updateSnapshotTarget } = actionCreators.flow;
    return wrapAll(dispatch, { updateSnapshotTarget });
  },
)(({ updateSnapshotTarget }, index: number, color: string) => {
  const isAvailable = /^#(([0-9a-f]){3}){1,2}$/i.test(color);
  if (isAvailable) {
    updateSnapshotTarget(index, { color });
  }
});

export default setColor;
