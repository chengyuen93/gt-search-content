import { PropsWithChildren, useMemo } from 'react';
import styles from './fonts.module.css';
import { HighlightableText, Offsets } from '../../types';

interface TextProps extends PropsWithChildren {
  className?: string;
  isBold?: boolean;
  isError?: boolean;
}

interface DisplayTextProps extends Omit<TextProps, 'className'> {
  className: string;
}

interface TextWrapperProps extends TextProps {
  fontClass: keyof typeof styles;
}

interface MixedHighlightTextProps {
  info: HighlightableText;
  RegularTextComponent: typeof Text;
  HighlightedTextComponent: typeof Text;
  regularTextProps?: TextProps;
  highlightTextProps?: TextProps;
}

/**
 * the base Text component
 */
const DisplayText = ({
  children,
  className,
  isBold,
  isError,
}: DisplayTextProps) => {
  const classNameString = useMemo(() => {
    let cName = className;
    if (isBold) cName = `${styles.semibold} ${cName}`;
    if (isError) cName = `${styles.error} ${cName}`;
    return cName;
  }, [isBold, isError, className]);

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

// offical text is handled differently because the font specs used are different
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

/**
 * to construct sentences that have a mixed of both regular text and highlighted text
 * provide the flexibility of controlling the styling of the regular and highlighted text separately
 */
export const MixedHighlightText = ({
  info,
  regularTextProps,
  highlightTextProps,
  RegularTextComponent,
  HighlightedTextComponent,
}: MixedHighlightTextProps) => {
  const { Text: text, Highlights: highlights } = info;

  if (!highlights.length)
    return (
      <RegularTextComponent {...regularTextProps}>{text}</RegularTextComponent>
    );

  return (
    <RegularTextComponent {...regularTextProps}>
      {info.Highlights.map(
        (offset: Offsets, index: number, array: Offsets[]) => {
          let prevEndIndex = 0;
          const items = [];
          if (index !== 0) {
            // get the index where the previous highlight text end to start the current loop
            prevEndIndex = array[index - 1].EndOffset;
          }
          // for regular text
          items.push(text.slice(prevEndIndex, offset.BeginOffset));
          // for the current highlight text
          items.push(
            <HighlightedTextComponent
              key={`${offset.BeginOffset}-${offset.EndOffset}`}
              {...highlightTextProps}
            >
              {text.slice(offset.BeginOffset, offset.EndOffset)}
            </HighlightedTextComponent>
          );
          if (index === array.length - 1) {
            // after the last highlight text, handle the regular text after the highlight text
            items.push(text.slice(offset.EndOffset));
          }
          return items;
        }
      )}
    </RegularTextComponent>
  );
};
