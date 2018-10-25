import * as React from 'react';
import { ActionCreatorsMap } from '../../../store';
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
  setCursor: ActionCreatorsMap['textarea']['setCursor'];
  setFocus: ActionCreatorsMap['textarea']['setFocus'];
  setCode: ActionCreatorsMap['flow']['setCode'];
}

class TextArea extends React.Component<TextAreaProps> {
  private area: HTMLTextAreaElement | null = null;
  private alive: boolean = false;

  constructor(props: TextAreaProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.watchCursor = this.watchCursor.bind(this);
    this.refArea = this.refArea.bind(this);
  }

  public componentDidMount() {
    this.alive = true;
    this.watchCursor();
  }

  public componentWillUnmount() {
    this.alive = false;
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
    this.props.setCode(e.target.value);
  }

  private refArea(elem: HTMLTextAreaElement | null) {
    this.area = elem;
  }

  private watchCursor() {
    if (this.area && this.alive) {
      this.props.setCursor(this.area);
      const isFocused = document.activeElement === this.area;
      if (isFocused !== this.props.isFocused) {
        this.props.setFocus(isFocused);
      }
      requestAnimationFrame(this.watchCursor);
    }
  }
}

export default TextArea;
