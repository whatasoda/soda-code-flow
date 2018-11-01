import * as ReactRedux from 'react-redux';
import TextArea, { TextAreaProps } from '../components/molecules/TextArea';
import { State } from '../store';
import { DispatchPropsOf, StatePropsOf } from './types';

type StateProps = StatePropsOf<TextAreaProps>;
type DispatchProps = DispatchPropsOf<TextAreaProps>;

const CTextArea = ReactRedux.connect<StateProps, DispatchProps, {}, State>(({ flow, textarea }) => {
  const { code } = flow;
  const { cursor, start, end, isFocused } = textarea;
  return { code, cursor, start, end, isFocused };
})(TextArea);

export default CTextArea;
