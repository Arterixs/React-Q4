import { Component } from 'react';

import { SearchPart } from 'components/search-part';

interface MainPageState {
  resultInputSearch: string;
}

export class MainPage extends Component<unknown, MainPageState> {
  constructor(props: unknown) {
    super(props);
    this.state = { resultInputSearch: '' };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(value: string) {
    this.setState({ resultInputSearch: value });
  }

  render() {
    return (
      <section>
        <SearchPart handleClick={this.handleSearch} />
      </section>
    );
  }
}
