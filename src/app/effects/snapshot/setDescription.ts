import { connect } from '../../lib/effect-redux';
import { actionCreators, ActionCreatorsMap, State } from '../../store';
import wrapAll from '../../util/wrapAll';

interface SetDescriptionContext {
  updateSnapshotTarget: ActionCreatorsMap['flow']['updateSnapshotTarget'];
}

const setDescription = connect<State, SetDescriptionContext>(
  () => ({}),
  (dispatch) => {
    const { updateSnapshotTarget } = actionCreators.flow;
    return wrapAll(dispatch, { updateSnapshotTarget });
  },
)(({ updateSnapshotTarget }, index: number, description: string) => {
  updateSnapshotTarget(index, { description });
});

export default setDescription;
