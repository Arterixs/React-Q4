import { ButtonClasses } from 'types/enum/classes';
import { Planet } from 'types/interface/api';
import { BaseButton } from 'ui/base-button';

import { Card } from 'components/card';

import styles from './styles.module.css';

interface DetailPageProps {
  onClose: () => void;
  onCloseBtn: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  planet: Planet | null;
}

export const DetailPage = (props: DetailPageProps) => (
  <div className={styles.wrapper} onClick={props.onClose} onKeyUp={() => {}} role="presentation">
    <section className={styles.section} onClick={props.onCloseBtn} onKeyUp={() => {}} role="presentation">
      <div className={styles.div}>
        <h3>Details</h3>
        <BaseButton onClick={props.onClose} classBtn={ButtonClasses.BTN_ERROR}>
          <span>Close</span>
        </BaseButton>
      </div>
      {props.planet && <Card planet={props.planet} />}
    </section>
  </div>
);
