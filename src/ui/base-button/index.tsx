import { ButtonHTMLAttributes, JSX } from 'react';
import clsx from 'clsx';
import { ButtonClasses } from 'types/enum/classes';

import styles from './style.module.css';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
  classBtn: ButtonClasses;
  onClick: () => void;
}

export const BaseButton = (props: BaseButtonProps) => {
  const { children, classBtn, onClick, ...attrs } = props;
  const classes = clsx(styles[classBtn], styles.default);
  return (
    <button className={classes} type="button" onClick={onClick} {...attrs}>
      {children}
    </button>
  );
};
