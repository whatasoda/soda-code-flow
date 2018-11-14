import * as copy from 'clipboard-copy';
import * as React from 'react';
import styleHelper from '../../../util/styleHelper';
import style = require('./UrlSharer.css');

const s = styleHelper(style);

export interface UrlSharerProps {
  className: string;
}
interface UrlSharerState {
  copied: boolean;
}

class UrlSharer extends React.Component<UrlSharerProps, UrlSharerState> {
  private timeout: number | null = null;
  private reject: (() => void) | null = null;
  constructor(props: UrlSharerProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = { copied: false };
  }

  public render() {
    const { className } = this.props;
    const { copied } = this.state;
    const url = window.location.href;
    return (
      <div className={s(['container'], [className])}>
        {copied && <span className={s(['copied'])}>Copied</span>}
        <pre className={s(['url'])} onClick={this.onClick}>
          <div className={s(['scroll-box'])}>
            <code className={s([], ['hljs'])}>{url}</code>
          </div>
        </pre>
      </div>
    );
  }

  private async onClick() {
    const url = window.location.href;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    if (this.reject) {
      this.reject();
      this.reject = null;
    }
    await copy(url);
    this.setState({ copied: true });
    try {
      await new Promise<boolean>((resolve, reject) => {
        this.reject = reject;
        this.timeout = setTimeout(resolve, 3000);
      });
      this.setState({ copied: false });
      this.timeout = null;
      // tslint:disable-next-line:no-empty
    } catch (_) {}
  }
}

export default UrlSharer;
