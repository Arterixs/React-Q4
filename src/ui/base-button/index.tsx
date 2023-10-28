import { ButtonHTMLAttributes } from 'react';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
  onClick: () => void;
}

export const BaseButton = (props: BaseButtonProps) => {
  const { children, onClick, ...attrs } = props;
  return (
    <button type="button" onClick={onClick} {...attrs}>
      {children}
    </button>
  );
};
