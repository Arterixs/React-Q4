import { ChangeEvent, Component } from 'react';
import { BaseButton } from 'ui/base-button';
import { BaseInput } from 'ui/base-input';

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
      <section>
        <BaseInput type="text" onChange={this.handleChange} value={searchValue} />
        <BaseButton onClick={this.handleClick}>
          <span>Поиск</span>
        </BaseButton>
      </section>
    );
  }
}
