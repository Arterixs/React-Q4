import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { getPrevRequestFromLocal } from 'service/localStorageApi';
import { InputTypes } from 'types/enum/attributs';
import { ButtonClasses, InputClasses } from 'types/enum/classes';
import { BaseButton } from 'ui/base-button';
import { BaseInput } from 'ui/base-input';

import styles from './styles.module.css';

interface SearchPartProps {
  handleClick: (value: string) => void;
}

export const SearchPart = (props: SearchPartProps) => {
  const [inputValue, setInputValue] = useState(() => getPrevRequestFromLocal());
  const [testError, setTestError] = useState(false);

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
    </section>
  );
};
