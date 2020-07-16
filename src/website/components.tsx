import * as React from 'react';

export const Emphasis: React.FC = (props) => <em>{props.children}</em>;

export const Button: React.FC<{
  onClick: () => void;
  primary?: boolean;
  disabled?: boolean;
}> = (props) => (
  <a
    className={`button ${props.primary && 'button--primary'} ${
      props.disabled && 'button--disabled'
    }`}
    href='#'
    onClick={props.onClick}
  >
    {props.children}
  </a>
);

export const GrayBox: React.FC<{ width: number }> = (props) => (
  <div
    className='background-color--grey--1 spaced--tight padded--tight'
    style={{ width: `${props.width}px` }}
  >
    {props.children}
  </div>
);

export const Centered: React.FC = (props) => (
  <div className='centered'>
    <div>{props.children}</div>
  </div>
);

export const FormField: React.FC = (props) => (
  <div className='form__field-container'>{props.children}</div>
);

export const TextInput: React.FC<{
  label: string;
  value: string;
  helpText?: string;
  placeholder?: string;
  onValueChange: (newValue: string) => void;
  disabled?: boolean;
}> = (props) => (
  <React.Fragment>
    <label htmlFor='text-input'>{props.label}</label>
    {props.helpText && <p className='form__help-text'>{props.helpText}</p>}
    <input
      type='text'
      name='text-input'
      id='text-input'
      disabled={props.disabled}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onValueChange(e.target.value)}
    />
  </React.Fragment>
);
