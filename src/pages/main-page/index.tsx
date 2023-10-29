import { Component } from 'react';
import { getPlanets } from 'service/getPlanets';
import { getPrevRequest } from 'service/getPrevRequest';
import { Planet } from 'types/interface/api';

import { PlanetsList } from 'components/planets-list';
import { SearchPart } from 'components/search-part';

import styles from './style.module.css';

interface MainPageState {
  resultInputSearch: string;
  planets: Planet[] | null;
}

export class MainPage extends Component<unknown, MainPageState> {
  constructor(props: unknown) {
    super(props);
    const prevRequest = getPrevRequest();
    this.state = { resultInputSearch: prevRequest, planets: null };

    this.handleSearch = this.handleSearch.bind(this);
  }

  async componentDidMount() {
    try {
      const resultApi = await getPlanets(this.state.resultInputSearch);
      if (resultApi) {
        this.setState({ planets: resultApi.results });
      } else {
        throw new Error('Oops');
      }
    } catch {
      throw new Error('OOps');
    }
  }

  handleSearch(value: string) {
    this.setState({ resultInputSearch: value });
  }

  render() {
    return (
      <section className={styles.section}>
        <SearchPart handleClick={this.handleSearch} />
        <PlanetsList planets={this.state.planets} />
      </section>
    );
  }
}
