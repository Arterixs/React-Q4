import { Component } from 'react';
import { prepareValueRequest } from 'helpers/prepareValueRequest';
import { getPlanets } from 'service/getPlanets';
import { getPrevRequestFromLocal, setCurrentRequestInLocal } from 'service/localStorageApi';
import { Planet } from 'types/interface/api';
import { BaseLoader } from 'ui/base-loader';

import { PlanetsList } from 'components/planets-list';
import { SearchPart } from 'components/search-part';

import styles from './style.module.css';

interface MainPageState {
  resultInputSearch: string;
  planets: Planet[] | null;
  loading: boolean;
}

export class MainPage extends Component<unknown, MainPageState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      resultInputSearch: getPrevRequestFromLocal(),
      planets: null,
      loading: true,
    };

    this.handleClickSearch = this.handleClickSearch.bind(this);
  }

  async componentDidMount() {
    try {
      const resultApi = await getPlanets(this.state.resultInputSearch);
      if (resultApi) {
        this.setState({ planets: resultApi.results, loading: false });
      } else {
        throw new Error('Oops');
      }
    } catch (error) {
      throw new Error('OOps');
    }
  }

  async handleClickSearch(value: string) {
    const checkValue = prepareValueRequest(value);
    setCurrentRequestInLocal(checkValue);
    this.setState({ resultInputSearch: checkValue, loading: true });
    const resultApi = await getPlanets(checkValue);
    if (resultApi) {
      this.setState({ planets: resultApi.results, loading: false });
    } else {
      throw new Error('Oops');
    }
  }

  render() {
    return (
      <section className={styles.section}>
        {this.state.loading && <BaseLoader />}
        <SearchPart handleClick={this.handleClickSearch} />
        <PlanetsList planets={this.state.planets} />
      </section>
    );
  }
}
