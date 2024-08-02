import { SharedImages } from '../../assets';
import { OFFICIAL_TEXT, OFFICIAL_TEXT_BOLD } from '../../constants';
import { OfficialText } from '../fonts';
import { Image } from '../image';

import styles from './page-header.module.css';

export const PageHeader = () => {
  return (
    <div className={styles.header_container}>
      <Image url={SharedImages.singapore_lion} className={styles.header_icon} />
      <OfficialText>
        {OFFICIAL_TEXT}
        <OfficialText isBold>{OFFICIAL_TEXT_BOLD}</OfficialText>
      </OfficialText>
    </div>
  );
};
