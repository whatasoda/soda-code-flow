import * as ReactRedux from 'react-redux';
import Code, { CodeProps } from '../components/organisims/Code';
import { State } from '../store';
import { DispatchPropsOf, StatePropsOf } from './types';

type StateProps = StatePropsOf<CodeProps>;
type DispatchProps = DispatchPropsOf<CodeProps>;

const CCode = ReactRedux.connect<StateProps, DispatchProps, {}, State>(({ flow }) => {
  const { code } = flow;
  return { code };
})(Code);

export default CCode;
