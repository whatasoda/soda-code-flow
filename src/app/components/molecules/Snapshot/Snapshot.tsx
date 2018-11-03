import * as React from 'react';
import { SnapshotResult } from '../../../code-flow/state/state';
import setColor from '../../../effects/snapshot/setColor';
import setKey from '../../../effects/snapshot/setKey';
import styleHelper from '../../../util/styleHelper';
import ColorPicker from '../../atoms/ColorPicker';
import SnapshotValue from '../../atoms/SnapshotValue';
import TargetKey from '../../atoms/TargetKey';
import style = require('./Snapshot.css');

const s = styleHelper(style);

interface SnapshotProps {
  snapshot: SnapshotResult;
  index: number;
}

const space = '';
class Snapshot extends React.Component<SnapshotProps> {
  constructor(props: SnapshotProps) {
    super(props);
    this.changeColor = this.changeColor.bind(this);
    this.changeKey = this.changeKey.bind(this);
  }

  public render() {
    const { snapshot, color, description, key } = this.props.snapshot;
    return (
      <section>
        <pre>
          <code className={s([], ['json', 'hljs'])}>
            <div>
              <h3 className={s(['headline'])}>
                <ColorPicker color={color} onChange={this.changeColor} />
                <TargetKey value={key} onChange={this.changeKey} />
              </h3>
              <span>{description}</span>
            </div>
            {snapshot && <SnapshotValue {...{ snapshot, space }} />}
          </code>
        </pre>
      </section>
    );
  }

  private changeColor(e: React.ChangeEvent<HTMLInputElement>) {
    setColor(this.props.index, e.target.value);
  }
  private changeKey(e: React.ChangeEvent<HTMLInputElement>) {
    setKey(this.props.index, e.target.value);
  }
}

export default Snapshot;
