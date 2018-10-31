import * as React from 'react';
import { setCode, SetCodeProps, watchCursor, WatchCursorContext, WatchCursorProps } from '../../../effects/textarea';
import styleHelper from '../../../util/styleHelper';
import CodeDeco from '../../atoms/CodeDeco';
import style = require('./TextArea.css');

const s = styleHelper(style);

export interface TextAreaProps extends SetCodeProps, WatchCursorProps {
  code: string;
  cursor: number;
  start: number;
  end: number;
  isFocused: boolean;
}

class TextArea extends React.Component<TextAreaProps> {
  private ctx: WatchCursorContext = {
    area: null,
    alive: false,
  };

  constructor(props: TextAreaProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.refArea = this.refArea.bind(this);
  }

  public componentDidMount() {
    this.ctx.alive = true;
    watchCursor(this, this.ctx);
  }

  public componentWillUnmount() {
    this.ctx.alive = false;
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
        <textarea ref={this.refArea} className={s(['text'])} value={code} onChange={this.onChange} />
      </React.Fragment>
    );
  }

  private onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCode(this, e.target);
  }

  private refArea(elem: HTMLTextAreaElement | null) {
    this.ctx.area = elem;
  }
}

export default TextArea;
