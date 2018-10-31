import * as React from 'react';
import fetchCodeFlow, { FetchCodeFlowProps } from '../../../effects/fetchCodeFlow';
import styleHelper from '../../../util/styleHelper';
import Icon from '../Icon';
import general = require('./general.css');

const s = styleHelper(general);

interface FetchProps extends FetchCodeFlowProps {}

let didInitialFetch = false;

class Fetch extends React.Component<FetchProps> {
  constructor(props: FetchProps) {
    super(props);
    this.fetch = this.fetch.bind(this);
    if (!didInitialFetch) {
      fetchCodeFlow(this);
      didInitialFetch = true;
    }
  }

  public render() {
    return (
      <a href="#" className={s(['button'])} onClick={this.fetch}>
        <Icon name="reload" size="xxlarge" />
      </a>
    );
  }

  private fetch(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    fetchCodeFlow(this);
  }
}

export default Fetch;
