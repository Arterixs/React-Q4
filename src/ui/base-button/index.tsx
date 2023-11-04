import { ButtonHTMLAttributes, JSX } from 'react';
import clsx from 'clsx';
import { ButtonClasses } from 'types/enum/classes';

import styles from './style.module.css';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
  classBtn: ButtonClasses | ButtonClasses[];
  onClick: () => void;
}

export const BaseButton = (props: BaseButtonProps) => {
  const { children, classBtn, onClick, ...attrs } = props;
  const isArray = Array.isArray(classBtn);
  const classes = isArray
    ? clsx(...classBtn.map((item) => styles[item]), styles.default)
    : clsx(styles[classBtn], styles.default);
  return (
    <button className={classes} type="button" onClick={onClick} {...attrs}>
      {children}
    </button>
  );
};
