import * as React from 'react';
import styles from './index.module.scss';

export interface ButtonProps {
  iconAfter?: any;
  iconBefore?: any;
  href: string;
  label: string;
  target?: boolean;
  theme: string;
}

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <a
      className={`${styles.button} ${styles[`button${props.theme}`]}`}
      href={props.href}
      target={props.target ? "_blank" : undefined}
    >
      {props.iconBefore && (
        <span className={styles.buttonIcon}>
          {props.iconBefore}
        </span>
      )}
      <span className={styles.buttonLabel}>{props.label}</span>
      {props.iconAfter && (
        <span className={styles.buttonIcon}>
          {props.iconAfter}
        </span>
      )}
    </a>
  );
};

export default Button;