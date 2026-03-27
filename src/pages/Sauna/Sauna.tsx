import { useLanguage } from '../../i18n'
import styles from './Sauna.module.scss'
import { img } from '../../utils/assets'

const imgs = [
  img('/img/sauna1.jpg'),
  img('/img/sauna2.jpg'),
  img('/img/sauna3.jpg'),
]

export default function Sauna() {
  const { t } = useLanguage()
  const [titleLine1, titleLine2] = t('sauna_title').split('\n')

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <img src={imgs[0]} alt="Сауна" className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>{t('sauna_badge')}</span>
          <h1 className={styles.title}>{titleLine1}<br />{titleLine2}</h1>
          <p className={styles.subtitle}>{t('sauna_subtitle')}</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.twoCol}>
          <div className={styles.photoGrid}>
            {imgs.map((src, i) => (
              <div key={i} className={i === 0 ? `${styles.photoWrap} ${styles.photoWrapWide}` : styles.photoWrap}>
                <img src={src} alt="" className={styles.photo} />
              </div>
            ))}
          </div>

          <div>
            <h2 className={styles.descTitle}>{t('sauna_descTitle')}</h2>
            <p className={styles.bodyText}>{t('sauna_text1')}</p>
            <p className={styles.bodyText}>{t('sauna_text2')}</p>

            <div className={styles.priceGrid}>
              {[
                { l: t('sauna_price'), v: '2 000 ₽/час' },
                { l: t('sauna_capacity'), v: 'до 12 человек' },
                { l: t('sauna_minOrder'), v: '2 часа' },
                { l: t('sauna_extraCharge'), v: '200 ₽/чел' },
              ].map(p => (
                <div key={p.l} className={styles.priceCard}>
                  <p className={styles.priceLabel}>{p.l}</p>
                  <p className={styles.priceValue}>{p.v}</p>
                </div>
              ))}
            </div>

            <div className={styles.included}>
              <div>
                <p className={styles.includedTitle}>{t('sauna_included')}</p>
                {[t('sauna_hat'), t('sauna_slippers'), t('sauna_restRoom'), t('sauna_kitchen'), t('sauna_parking')].map(item => (
                  <p key={item} className={styles.includedItem}>✓ {item}</p>
                ))}
              </div>
              <div>
                <p className={styles.paidTitle}>{t('sauna_extra')}</p>
                {[t('sauna_towels'), t('sauna_robes'), t('sauna_sheets')].map(item => (
                  <p key={item} className={styles.paidItem}>· {item}</p>
                ))}
              </div>
            </div>

            <a href="tel:+79287733550" className={styles.bookBtn}>
              {t('sauna_book')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
