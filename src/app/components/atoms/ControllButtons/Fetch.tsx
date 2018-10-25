import * as React from 'react';
import fetchCodeFlow, { FetchCodeFlowProps } from '../../../tasks/fetchCodeFlow';
import Icon from '../Icon';

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
      <a href="#" onClick={this.fetch}>
        <Icon name="spinner11" size="xxlarge" />
      </a>
    );
  }

  private fetch(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    fetchCodeFlow(this);
  }
}

export default Fetch;
