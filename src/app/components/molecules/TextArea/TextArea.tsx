import * as React from 'react';
import Highlight from 'react-highlight';
import style = require('./style.css');
import styleHelper from '../../../util/styleHelper';
import TextCursor from '../../atoms/TextCursor';

const s = styleHelper(style);

type Updater = (input: string) => void;
interface TextAreaProps {
  update: Updater;
  content: string;
}

class TextArea extends React.Component<TextAreaProps, {row:number, col:number}> {
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
    const { content } = this.props;
    return (
      <div className={s('container')}>
        <Highlight className='js'>{content}</Highlight>
        <pre className={s('input-container')}>
          <code className={s('input-container')}>
            <TextCursor col={this.state.col} row={this.state.row}/>
            <textarea
              ref={(elem) => this.area = elem}
              className={s('input')}
              value={content}
              onChange={this.onChange}
            />
          </code>
        </pre>
      </div>
    );
  }
  
  private onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.props.update(e.target.value)
  }
  
  private updateCursor(position: number) {
    const { content } = this.props;
    if (position > content.length) {
      return;
    }
    
    let row = 0;
    let curr = 0;
    while (curr <= position) {
      const next = content.indexOf('\n', curr);
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
