import clsx from 'clsx'
import { useData } from '../../context/DataContext'
import { useLanguage } from '../../i18n'
import styles from './Services.module.scss'

export default function Services() {
  const { freeServices, paidServices } = useData()
  const { t } = useLanguage()

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <span className={styles.badge}>{t('services_badge')}</span>
        <h1 className={styles.title}>{t('services_title')}</h1>

        <div className={styles.freeSection}>
          <div className={styles.freeTitleRow}>
            <h2 className={styles.freeSectionTitle}>{t('services_freeTitle')}</h2>
            <span className={styles.includedBadge}>{t('services_includedBadge')}</span>
          </div>
          <div className={styles.freeGrid}>
            {freeServices.map(item => (
              <div key={item} className={styles.freeItem}>
                <span className={styles.freeIcon}>◈</span>
                <span className={styles.freeText}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.paidSection}>
          <h2 className={styles.paidTitle}>{t('services_paidTitle')}</h2>
          <div className={styles.paidTable}>
            {paidServices.map((item, i) => (
              <div key={item.id} className={clsx(styles.paidRow, i % 2 !== 0 && styles.paidRowAlt)}>
                <span className={styles.paidRowName}>{item.name}</span>
                <span className={styles.paidRowPrice}>{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
