import { ChangeEvent, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { InputTypes } from 'types/enum/attributs';
import { InputClasses } from 'types/enum/classes';

import styles from './style.module.css';

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  type: InputTypes;
  classInput: InputClasses;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const BaseInput = (props: BaseInputProps) => {
  const { type, value, classInput, onChange, ...attrs } = props;
  const classes = clsx(styles[classInput], styles.default);
  return <input className={classes} type={type} value={value} onChange={onChange} {...attrs} />;
};
