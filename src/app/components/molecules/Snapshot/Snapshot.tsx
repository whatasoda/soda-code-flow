import * as React from 'react';
import { SnapshotResult } from '../../../code-flow/state/state';
import styleHelper from '../../../util/styleHelper';
import ColorPicker from '../../atoms/ColorPicker';
import SnapshotValue from '../../atoms/SnapshotValue';
import style = require('./Snapshot.css');

const s = styleHelper(style);

interface SnapshotProps {
  snapshot: SnapshotResult;
  index: number;
}

const space = '';
const Snapshot: React.SFC<SnapshotProps> = ({ snapshot: { snapshot, color, description, key }, index }) => (
  <section>
    <pre>
      <code className={s([], ['json', 'hljs'])}>
        <div>
          <h3 className={s(['headline'])}>
            <ColorPicker {...{ index, color }} />
            <input type="text" defaultValue={key || 'Dynamic'} className={s(['key'])} />
          </h3>
          <span>{description}</span>
        </div>
        {snapshot && <SnapshotValue {...{ snapshot, space }} />}
      </code>
    </pre>
  </section>
);

export default Snapshot;
