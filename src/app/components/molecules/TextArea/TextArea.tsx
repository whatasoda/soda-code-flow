import * as React from 'react';
import Highlight from 'react-highlight';
import styleHelper from '../../../util/styleHelper';
import TextCursor from '../../atoms/TextCursor';
import style = require('./style.css');

const s = styleHelper(style);

type Updater = (input: string) => void;
interface TextAreaProps {
  update: Updater;
  code: string;
}

class TextArea extends React.Component<TextAreaProps, { row: number; col: number }> {
  private area: HTMLTextAreaElement | null = null;
  private alive: boolean = false;

  constructor(props: TextAreaProps) {
    super(props);
    this.state = { col: 0, row: 0 };
    this.onChange = this.onChange.bind(this);
    this.updateCursor = this.updateCursor.bind(this);
  }

  public componentDidMount() {
    this.alive = true;
    let prev = 0;
    const watch = () => {
      if (this.area && this.alive) {
        const position = this.area.selectionStart;
        if (prev !== position) {
          prev = position;
          this.updateCursor(position);
        }
        requestAnimationFrame(watch);
      }
    };
    watch();
  }

  public componentWillUnmount() {
    this.alive = false;
  }

  public render() {
    const { code } = this.props;
    return (
      <div className={s('layout')}>
        <div className={s('container')}>
          <div className={s('scroll-box')}>
            <Highlight className="js">{code}</Highlight>
            <pre>
              <code className={s('input-container')}>
                <TextCursor col={this.state.col} row={this.state.row} />
                <textarea
                  ref={(elem) => (this.area = elem)}
                  className={s('input')}
                  value={code}
                  onChange={this.onChange}
                />
              </code>
            </pre>
          </div>
        </div>
      </div>
    );
  }

  private onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.props.update(e.target.value);
  }

  private updateCursor(position: number) {
    const { code } = this.props;
    if (position > code.length) {
      return;
    }

    let row = 0;
    let curr = 0;
    while (curr <= position) {
      const next = code.indexOf('\n', curr);
      if (next === -1 || next >= position) {
        const col = position - curr;
        return this.setState({ row, col });
      }
      curr = next + 1;
      row++;
    }
  }
}

export default TextArea;
