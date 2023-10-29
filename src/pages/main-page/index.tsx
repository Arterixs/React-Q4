import { Component } from 'react';
import { prepareValueRequest } from 'helpers/prepareValueRequest';
import { getPlanets } from 'service/getPlanets';
import { getPrevRequestFromLocal, setCurrentRequestInLocal } from 'service/localStorageApi';
import { Planet } from 'types/interface/api';
import { BaseLoader } from 'ui/base-loader';

import { CardList } from 'components/card-list';
import { SearchPart } from 'components/search-part';

import styles from './style.module.css';

interface MainPageState {
  resultInputSearch: string;
  planets: Planet[] | null;
  loading: boolean;
  hasErrorRequest: boolean;
  hasErrorHard: boolean;
}

export class MainPage extends Component<unknown, MainPageState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      resultInputSearch: getPrevRequestFromLocal(),
      planets: null,
      loading: true,
      hasErrorRequest: false,
      hasErrorHard: false,
    };

    this.handleClickSearch = this.handleClickSearch.bind(this);
  }

  async componentDidMount() {
    try {
      const resultApi = await getPlanets(this.state.resultInputSearch);
      if (resultApi) {
        this.setState({ planets: resultApi.results, loading: false });
      } else {
        this.setState({ hasErrorRequest: true, loading: false });
      }
    } catch {
      this.setState({ hasErrorHard: true, loading: false });
    }
  }

  componentDidUpdate() {
    if (this.state.hasErrorHard) {
      throw new Error('There was an error in the fetch request, function getPlanets');
    }
  }

  async handleClickSearch(value: string) {
    const checkValue = prepareValueRequest(value);
    setCurrentRequestInLocal(checkValue);
    this.setState({ resultInputSearch: checkValue, loading: true });
    try {
      const resultApi = await getPlanets(checkValue);
      if (resultApi) {
        this.setState({ planets: resultApi.results, hasErrorRequest: false, loading: false });
      } else {
        this.setState({ hasErrorRequest: true, loading: false });
      }
    } catch {
      this.setState({ hasErrorHard: true, loading: false });
    }
  }

  render() {
    return (
      <section className={styles.section}>
        {this.state.loading && <BaseLoader />}
        <SearchPart handleClick={this.handleClickSearch} />
        <CardList planets={this.state.planets} hasError={this.state.hasErrorRequest} />
      </section>
    );
  }
}
