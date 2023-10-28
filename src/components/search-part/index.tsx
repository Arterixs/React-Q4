import { ChangeEvent, Component } from 'react';
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
}

export class SearchPart extends Component<SearchPartProps, SearchPartState> {
  constructor(props: SearchPartProps) {
    super(props);
    this.state = { searchValue: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ searchValue: event.target.value });
  }

  handleClick() {
    this.props.handleClick(this.state.searchValue);
  }

  render() {
    const { searchValue } = this.state;
    return (
      <section className={styles.wrapper}>
        <BaseInput
          classInput={InputClasses.MAIN_SEARCH}
          type={InputTypes.TEXT}
          onChange={this.handleChange}
          value={searchValue}
        />
        <BaseButton classBtn={ButtonClasses.BTN_SEARCH} onClick={this.handleClick}>
          <span>Поиск</span>
        </BaseButton>
      </section>
    );
  }
}
