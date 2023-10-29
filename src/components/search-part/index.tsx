import { ChangeEvent, Component, KeyboardEvent } from 'react';
import { getPrevRequestFromLocal } from 'service/localStorageApi';
import { InputTypes } from 'types/enum/attributs';
import { ButtonClasses, InputClasses } from 'types/enum/classes';
import { BaseButton } from 'ui/base-button';
import { BaseInput } from 'ui/base-input';

import styles from './styles.module.css';

interface SearchPartProps {
  handleClick: (value: string) => void;
}

interface SearchPartState {
  searchValue: string;
  testError: boolean;
}

export class SearchPart extends Component<SearchPartProps, SearchPartState> {
  constructor(props: SearchPartProps) {
    super(props);
    this.state = { searchValue: getPrevRequestFromLocal(), testError: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePressEnter = this.handlePressEnter.bind(this);
    this.handleErrorClick = this.handleErrorClick.bind(this);
  }

  componentDidUpdate() {
    if (this.state.testError) {
      throw new Error('Error for test Error Boundary');
    }
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ searchValue: event.target.value });
  }

  handleClick() {
    this.props.handleClick(this.state.searchValue);
  }

  handleErrorClick() {
    this.setState({ testError: true });
  }

  handlePressEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      this.props.handleClick(this.state.searchValue);
    }
  }

  render() {
    const { searchValue } = this.state;
    return (
      <section className={styles.wrapper}>
        <BaseInput
          classInput={InputClasses.MAIN_SEARCH}
          type={InputTypes.TEXT}
          onChange={this.handleChange}
          onKeyDown={this.handlePressEnter}
          value={searchValue}
        />
        <BaseButton classBtn={ButtonClasses.BTN_SEARCH} onClick={this.handleClick}>
          <span>Search</span>
        </BaseButton>
        <BaseButton classBtn={ButtonClasses.BTN_ERROR} onClick={this.handleErrorClick}>
          <span>Error</span>
        </BaseButton>
      </section>
    );
  }
}
