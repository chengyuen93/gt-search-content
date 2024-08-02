import { PropsWithChildren, useMemo } from 'react';
import styles from './fonts.module.css';

interface TextProps extends PropsWithChildren {
  className?: string;
  isBold?: boolean;
}

interface DisplayTextProps extends Omit<TextProps, 'className'> {
  className: string;
}

interface TextWrapperProps extends TextProps {
  fontClass: keyof typeof styles;
}

const DisplayText = ({ children, className, isBold }: DisplayTextProps) => {
  const classNameString = useMemo(
    () => (isBold ? `${className} ${styles.semibold}` : className),
    [isBold, className]
  );
  return (
    <span className={`${styles.text} ${classNameString}`}>{children}</span>
  );
};

const TextWrapper = ({ className, fontClass, ...props }: TextWrapperProps) => {
  const classNameString = useMemo(
    () => (className ? `${className} ${fontClass}` : `${fontClass}`),
    [className, fontClass]
  );
  return <DisplayText className={classNameString} {...props} />;
};

export const Huge = (props: TextProps) => (
  <TextWrapper fontClass={styles.huge} {...props} />
);

export const H3 = (props: TextProps) => (
  <TextWrapper fontClass={styles.h3} {...props} />
);
export const H4 = (props: TextProps) => (
  <TextWrapper fontClass={styles.h4} {...props} />
);
export const H6 = (props: TextProps) => (
  <TextWrapper fontClass={styles.h6} {...props} />
);
export const Text = (props: TextProps) => (
  <TextWrapper fontClass={styles.display_body} {...props} />
);

export const OfficialText = (props: TextProps) => {
  const fontClass = useMemo(
    () =>
      `${styles.official_text} ${
        props.isBold ? styles.official_text_bold : ''
      }`,
    [props.isBold]
  );
  return <TextWrapper fontClass={fontClass} {...props} />;
};
