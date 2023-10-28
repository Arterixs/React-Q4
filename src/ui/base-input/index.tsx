import { ChangeEvent, InputHTMLAttributes } from 'react';

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const BaseInput = (props: BaseInputProps) => {
  const { type, value, onChange, ...attrs } = props;
  return <input type={type} value={value} onChange={onChange} {...attrs} />;
};
