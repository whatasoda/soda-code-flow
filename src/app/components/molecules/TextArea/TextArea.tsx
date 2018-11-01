import * as React from 'react';
import setCode from '../../../effects/textarea/setCode';
import watchCursor from '../../../effects/textarea/watchCursor';
import styleHelper from '../../../util/styleHelper';
import CodeDeco from '../../atoms/CodeDeco';
import style = require('./TextArea.css');

const s = styleHelper(style);

export interface TextAreaProps {
  code: string;
  cursor: number;
  start: number;
  end: number;
  isFocused: boolean;
}

class TextArea extends React.Component<TextAreaProps> {
  public componentWillUnmount() {
    watchCursor(null);
  }

  public render() {
    const { code, start, end, cursor, isFocused } = this.props;
    return (
      <React.Fragment>
        {isFocused && (
          <React.Fragment>
            <CodeDeco {...{ code, start, end }} className={s(['selection'])} />
            <CodeDeco {...{ code }} start={cursor} end={cursor + 1} className={s(['cursor'])} />
          </React.Fragment>
        )}
        <textarea ref={this.refArea} className={s(['text'])} defaultValue={code} onChange={this.onChange} />
      </React.Fragment>
    );
  }

  private onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCode(e.target);
  }

  private refArea(elem: HTMLTextAreaElement | null) {
    watchCursor(elem);
  }
}

export default TextArea;
