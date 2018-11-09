import * as React from 'react';
import { SnapshotResult } from '../../../code-flow/state/state';
import setColor from '../../../effects/snapshot/setColor';
import setDescription from '../../../effects/snapshot/setDescription';
import setKey from '../../../effects/snapshot/setKey';
import styleHelper from '../../../util/styleHelper';
import ColorPicker from '../../atoms/ColorPicker';
import SnapshotValue from '../../atoms/SnapshotValue';
import ClearTextInput from '../../atoms/TargetKey';
import style = require('./Snapshot.css');

const s = styleHelper(style);

interface SnapshotProps {
  snapshot: SnapshotResult;
  index: number;
}
interface SnapshotState {
  isOpen: boolean;
}

const space = '';
class Snapshot extends React.Component<SnapshotProps, SnapshotState> {
  constructor(props: SnapshotProps) {
    super(props);
    this.state = { isOpen: true };
    this.setColor = this.setColor.bind(this);
    this.setKey = this.setKey.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  public render() {
    const { snapshot, color, description, key } = this.props.snapshot;
    const { isOpen } = this.state;
    return (
      <section className={s([isOpen ? 'open' : 'close'])}>
        <pre>
          <code className={s([], ['json', 'hljs'])}>
            <div className={s(['header'])}>
              <h2 className={s(['headline'])}>
                <a href="#" className={s(['chevron'])} onClick={this.toggleOpen}>
                  {'>'}
                </a>
                <ColorPicker color={color} onChange={this.setColor} />
                <ClearTextInput value={key} placeholder="DYNAMIC" onChange={this.setKey} />
              </h2>
              <p className={s(['description'], ['hljs-comment'])}>
                {'/* '}
                <ClearTextInput value={description} placeholder="description" onChange={this.setDescription} />
                {' */'}
              </p>
            </div>
            {snapshot && (
              <p className={s(['main'])}>
                <SnapshotValue {...{ snapshot, space }} />
              </p>
            )}
          </code>
        </pre>
      </section>
    );
  }

  private setColor(e: React.ChangeEvent<HTMLInputElement>) {
    setColor(this.props.index, e.target.value);
  }
  private setKey(e: React.ChangeEvent<HTMLInputElement>) {
    setKey(this.props.index, e.target.value);
  }
  private setDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(this.props.index, e.target.value);
  }
  private toggleOpen() {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  }
}

export default Snapshot;
