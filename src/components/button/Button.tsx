import { ReactNode, useMemo } from 'react';
import styles from './button.module.css';
import { H4 } from '../fonts';
import { FLEX_ROW_CENTER } from '../../constants';

interface ButtonProps {
  icon?: ReactNode;
  text?: string;
  className?: string;
  onClick: () => void;
}

export const Button = ({ icon, text, className, onClick }: ButtonProps) => {
  const classNameString = useMemo(() => {
    let buttonClass = `${styles.button} ${FLEX_ROW_CENTER}`;
    if (icon) {
      buttonClass += ` ${text ? styles.with_icon : styles.icon_only}`;
    }
    return className ? `${className} ${buttonClass}` : buttonClass;
  }, [className, icon, text]);

  const textClassName = useMemo(
    () =>
      icon
        ? `${styles.button_text} ${styles.text_with_icon}`
        : styles.button_text,
    [icon]
  );

  return (
    <button className={classNameString} onClick={onClick}>
      {icon}
      {text && (
        <H4 isBold className={textClassName}>
          {text}
        </H4>
      )}
    </button>
  );
};
