import { ReactNode, useMemo } from 'react';
import styles from './button.module.css';
import { H4 } from '../fonts';

interface ButtonProps {
  icon?: ReactNode;
  text?: string;
  className?: string;
  onClick: () => void;
}

export const Button = ({ icon, text, className, onClick }: ButtonProps) => {
  const classNameString = useMemo(() => {
    const buttonClass = `${styles.button} ${icon ? styles.with_icon : ''}`;
    return className ? `${className} ${buttonClass}` : buttonClass;
  }, [className, icon]);

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
