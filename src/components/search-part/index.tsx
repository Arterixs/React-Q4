import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useSearchContext } from 'storage/hooks';
import { InputTypes } from 'types/enum/attributs';
import { ButtonClasses, InputClasses } from 'types/enum/classes';
import { BaseButton } from 'ui/base-button';
import { BaseInput } from 'ui/base-input';

import { getAmountCards } from './getAmountCards';

import styles from './styles.module.css';

interface SearchPartProps {
  handleClick: (value: string) => void;
  handleClickOptions: (event: ChangeEvent<HTMLSelectElement>) => void;
  amountPage: number;
  amountElem: string;
}

export const SearchPart = (props: SearchPartProps) => {
  const { searchValue, updateSearchValue } = useSearchContext();
  const [testError, setTestError] = useState(false);
  const amountCards = getAmountCards(props.amountPage);

  if (testError) {
    throw new Error('Error for test Error Boundary');
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateSearchValue(event.target.value);
  };

  const handleClick = () => {
    props.handleClick(searchValue);
  };

  const handleErrorClick = () => {
    setTestError(true);
  };

  const handlePressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.handleClick(searchValue);
    }
  };

  return (
    <section className={styles.wrapper}>
      <BaseInput
        classInput={InputClasses.MAIN_SEARCH}
        type={InputTypes.TEXT}
        onChange={handleChange}
        onKeyDown={handlePressEnter}
        value={searchValue}
      />
      <BaseButton classBtn={ButtonClasses.BTN_SEARCH} onClick={handleClick}>
        <span>Search</span>
      </BaseButton>
      <BaseButton classBtn={ButtonClasses.BTN_ERROR} onClick={handleErrorClick}>
        <span>Error</span>
      </BaseButton>
      <select
        className={styles.select}
        value={props.amountElem}
        onChange={props.handleClickOptions}
        disabled={Boolean(searchValue)}
      >
        {amountCards.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </section>
  );
};
