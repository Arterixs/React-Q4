import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { getPrevRequestFromLocal } from 'service/localStorageApi';
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
}

export const SearchPart = (props: SearchPartProps) => {
  const [inputValue, setInputValue] = useState(() => getPrevRequestFromLocal());
  const [testError, setTestError] = useState(false);
  const amountCards = getAmountCards(props.amountPage);

  if (testError) {
    throw new Error('Error for test Error Boundary');
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    props.handleClick(inputValue);
  };

  const handleErrorClick = () => {
    setTestError(true);
  };

  const handlePressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.handleClick(inputValue);
    }
  };

  return (
    <section className={styles.wrapper}>
      <BaseInput
        classInput={InputClasses.MAIN_SEARCH}
        type={InputTypes.TEXT}
        onChange={handleChange}
        onKeyDown={handlePressEnter}
        value={inputValue}
      />
      <BaseButton classBtn={ButtonClasses.BTN_SEARCH} onClick={handleClick}>
        <span>Search</span>
      </BaseButton>
      <BaseButton classBtn={ButtonClasses.BTN_ERROR} onClick={handleErrorClick}>
        <span>Error</span>
      </BaseButton>
      <select className={styles.select} onChange={props.handleClickOptions}>
        {amountCards.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </section>
  );
};
