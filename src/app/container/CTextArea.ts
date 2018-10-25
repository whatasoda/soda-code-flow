import * as ReactRedux from 'react-redux';
import TextArea, { TextAreaProps } from '../components/molecules/TextArea';
import { actionCreators, State } from '../store';
import wrapAll from '../util/wrapAll';
import { DispatchPropsOf, StatePropsOf } from './types';

type StateProps = StatePropsOf<TextAreaProps>;
type DispatchProps = DispatchPropsOf<TextAreaProps>;

const CTextArea = ReactRedux.connect<StateProps, DispatchProps, {}, State>(
  ({ flow, textarea }) => {
    const { code } = flow;
    const { cursor, start, end, isFocused } = textarea;
    return { code, cursor, start, end, isFocused };
  },
  (dispatch) => {
    const { flow, textarea } = actionCreators;
    const { setCode } = flow;
    const { setCursor, setFocus } = textarea;
    return wrapAll(dispatch, { setCode, setFocus, setCursor });
  },
)(TextArea);

export default CTextArea;
